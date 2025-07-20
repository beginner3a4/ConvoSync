const ChatRoom = require('../models/ChatRoom');
const User = require('../models/User');
const Reminder = require('../models/Reminder');

// get chat list for user
const getChatList = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId).populate({
      path: 'joinedRooms',
      populate: {
        path: 'Meet',
        model: 'Reminder'
      }
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    return res.status(200).json({ roomsArray: user.joinedRooms });
  } catch (error) {
    console.error('Error in getChatList:', error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

// get chat room details
const getChatRoom = async (req, res) => {
  try {
    const roomId = req.params.roomid;
    const userId = req.user.id;

    const room = await ChatRoom.findById(roomId).populate('Meet');
    
    if (!room) {
      return res.status(404).json({ msg: 'Chat room not found' });
    }

    // Check if user is a member of this room
    if (!room.joinedUsers.includes(userId)) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    // Get participant names
    const participants = await User.find({
      _id: { $in: room.joinedUsers }
    }).select('name');

    const participantNames = participants.map(p => p.name);

    return res.status(200).json({ 
      room, 
      participants: participantNames,
      Meet: room.Meet 
    });
  } catch (error) {
    console.error('Error in getChatRoom:', error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

// create chat room with meeting
const createChatMeetRoom = async (req, res) => {
  try {
    const { roomLink, emailArr, roomName, isMeet, joinedUsers, StartTime, EndTime } = req.body;
    const userId = req.user.id;

    // Create the meeting/event first
    let meetingId = null;
    if (isMeet) {
      const meeting = new Reminder({
        userId: userId,
        Subject: roomName,
        StartTime: StartTime,
        EndTime: EndTime,
        Description: `${process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000'}${roomLink}${Math.random().toString(36).substr(2, 9)}`,
        isAllDay: false
      });

      const savedMeeting = await meeting.save();
      meetingId = savedMeeting._id;
    }

    // Create the chat room
    const chatRoom = new ChatRoom({
      title: roomName,
      joinedUsers: joinedUsers,
      msgArray: [],
      Meet: meetingId
    });

    const savedRoom = await chatRoom.save();

    // Update user's joined rooms
    await User.findByIdAndUpdate(
      userId,
      { $push: { joinedRooms: savedRoom._id } }
    );

    // Send emails to invited users
    if (emailArr && emailArr.length > 0) {
      const transporter = require('../config/nodemailer');
      const user = await User.findById(userId);
      
      const inviteLink = `${process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000'}/invite/${savedRoom._id}`;
      
      for (const email of emailArr) {
        if (email.trim()) {
          const mailOptions = {
            from: process.env.MAIL_SERVICE_ID,
            to: email.trim(),
            subject: 'Meeting Invitation - ConvoSync',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #667eea;">You're Invited to Join a Meeting!</h2>
                <p><strong>${user.name}</strong> (${user.email}) has invited you to join a meeting:</p>
                <h3 style="color: #333;">${roomName}</h3>
                <p><strong>Start Time:</strong> ${new Date(StartTime).toLocaleString()}</p>
                <p><strong>End Time:</strong> ${new Date(EndTime).toLocaleString()}</p>
                <div style="margin: 30px 0;">
                  <a href="${inviteLink}" 
                     style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                            color: white; 
                            padding: 15px 30px; 
                            text-decoration: none; 
                            border-radius: 25px; 
                            display: inline-block;
                            font-weight: bold;">
                    Join Meeting
                  </a>
                </div>
                <p style="color: #666; font-size: 14px;">
                  If the button doesn't work, copy and paste this link into your browser:<br>
                  <a href="${inviteLink}">${inviteLink}</a>
                </p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px;">
                  This invitation was sent via ConvoSync. If you don't have an account, you'll need to create one to join the meeting.
                </p>
              </div>
            `
          };

          try {
            await transporter.sendMail(mailOptions);
          } catch (emailError) {
            console.error('Error sending email to', email, ':', emailError);
          }
        }
      }
    }

    return res.status(200).json({ 
      msg: 'Meeting scheduled and invitations sent successfully!',
      type: 'success',
      room: savedRoom 
    });

  } catch (error) {
    console.error('Error in createChatMeetRoom:', error);
    return res.status(500).json({ 
      msg: 'Failed to create meeting',
      type: 'error' 
    });
  }
};

// join chat room via invite
const joinChatRoom = async (req, res) => {
  try {
    const chatRoomId = req.params.chatRoomId;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        msg: 'User ID is required' 
      });
    }

    // Find the chat room
    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (!chatRoom) {
      return res.status(404).json({ 
        success: false, 
        msg: 'Chat room not found' 
      });
    }

    // Check if user is already in the room
    if (chatRoom.joinedUsers.includes(userId)) {
      return res.status(200).json({ 
        success: true, 
        msg: 'You are already a member of this chat room' 
      });
    }

    // Add user to the chat room
    await ChatRoom.findByIdAndUpdate(
      chatRoomId,
      { $push: { joinedUsers: userId } }
    );

    // Add room to user's joined rooms
    await User.findByIdAndUpdate(
      userId,
      { $push: { joinedRooms: chatRoomId } }
    );

    return res.status(200).json({ 
      success: true, 
      msg: 'Successfully joined the chat room!' 
    });

  } catch (error) {
    console.error('Error in joinChatRoom:', error);
    return res.status(500).json({ 
      success: false, 
      msg: 'Failed to join chat room. Please try again.' 
    });
  }
};

module.exports = {
  getChatList,
  getChatRoom,
  createChatMeetRoom,
  joinChatRoom
};