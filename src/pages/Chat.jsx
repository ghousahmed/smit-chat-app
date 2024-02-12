import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Sidebar,
    Search,
    Conversation,
    Avatar,
    ConversationList,
    ConversationHeader,
    VoiceCallButton,
    VideoCallButton,
    InfoButton,
    TypingIndicator,
    MessageSeparator,
    ExpansionPanel
} from "@chatscope/chat-ui-kit-react";
import { useState, useEffect, useCallback, useContext, useMemo } from "react";
import { formatDistance } from "date-fns";
import { IoMdLogOut } from "react-icons/io";
import { auth, signOut, collection, getDocs, query, where, db, addDoc, onSnapshot, orderBy, serverTimestamp } from "../config/firebase";
import User from "../context/user";

function UserChat() {
    const [messageInputValue, setMessageInputValue] = useState("")
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sidebarStyle, setSidebarStyle] = useState({});
    const [chatContainerStyle, setChatContainerStyle] = useState({});
    const [conversationContentStyle, setConversationContentStyle] = useState({});
    const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});
    const [chats, setChats] = useState([])
    const [chatMessages, setChatMessages] = useState([])
    const [currentChat, setCurrentChat] = useState({})
    const user = useContext(User).user


    const logout = () => {
        signOut(auth)
    }

    const chatId = () => {
        let id = "";
        if (user.uid < currentChat.uid) {
            id = `${user.uid}${currentChat.uid}`
        } else {
            id = `${currentChat.uid}${user.uid}`
        }
        return id
    }

    const onSend = async () => {

        // setChatMessages([...chatMessages,
        // {
        //     message: messageInputValue,
        //     sentTime: new Date().toDateString(),
        //     sender: user.uid,
        //     direction: "outgoing",
        //     receiver: currentChat.uid,
        //     chatId: chatId()
        // }])
        setMessageInputValue("")
        await addDoc(collection(db, "messages"), {
            message: messageInputValue,
            sentTime: new Date().toDateString(),
            sender: user.uid,
            receiver: currentChat.uid,
            chatId: chatId(),
            timeStamp: serverTimestamp()
        });
    }

    const handleBackClick = () => setSidebarVisible(!sidebarVisible);

    const handleConversationClick = useCallback(() => {
        if (sidebarVisible) {
            setSidebarVisible(false);
        }
    }, [sidebarVisible, setSidebarVisible])

    const getAllUsers = async () => {
        const q = query(collection(db, "users"), where("email", "!=", user.email));
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
            const colors = ["757ce8", "f44336", '0D8ABC'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)]
            users.push({ ...doc.data(), id: doc.id, bgColor: randomColor })
        });
        setCurrentChat(users[0])
        setChats(users)
    }


    useEffect(() => {
        getAllUsers()
    }, [])


    const getAllMessages = async () => {
        const q = query(collection(db, "messages"), where("chatId", "==", chatId()), orderBy("timeStamp", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({
                    ...doc.data(),
                    id: doc.id,
                    direction: doc.data().sender === user.uid ? "outgoing" : "incoming"
                })
            });
            setChatMessages(messages)
        });
    }

    useEffect(() => {
        getAllMessages()
    }, [currentChat])

    useEffect(() => {
        if (sidebarVisible) {
            setSidebarStyle({
                display: "flex",
                flexBasis: "auto",
                width: "100%",
                maxWidth: "100%"
            });
            setConversationContentStyle({
                display: "flex"
            });
            setConversationAvatarStyle({
                marginRight: "1em"
            });
            setChatContainerStyle({
                display: "none"
            });
        } else {
            setSidebarStyle({});
            setConversationContentStyle({});
            setConversationAvatarStyle({});
            setChatContainerStyle({});
        }
    }, [sidebarVisible, setSidebarVisible, setConversationContentStyle, setConversationAvatarStyle, setSidebarStyle, setChatContainerStyle]);



    const randomColor = useMemo(() => {
        const colors = ["757ce8", "f44336", '0D8ABC'];
        return colors[Math.floor(Math.random() * colors.length)]
    }, [])

    return (
        <div style={{
            height: "98vh",
            position: "relative"
        }}>
            <MainContainer responsive>
                <Sidebar position="left" scrollable={false} style={sidebarStyle}>
                    <ConversationHeader>
                        <Avatar src={`https://ui-avatars.com/api/?background=${randomColor}&color=fff&name=${user.full_name}`} name="Zoe" />
                        <ConversationHeader.Content userName={user.full_name} />
                        <ConversationHeader.Actions>
                            <IoMdLogOut onClick={logout} cursor={"pointer"} size={30} />
                        </ConversationHeader.Actions>
                    </ConversationHeader>
                    <Search placeholder="Search..." />
                    <ConversationList>
                        {chats.map((v) => {
                            return (
                                <Conversation key={v.id} onClick={
                                    () => {
                                        handleConversationClick()
                                        setCurrentChat(v)
                                    }
                                }>
                                    <Avatar src={`https://ui-avatars.com/api/?background=${v.bgColor}&color=fff&name=${v.full_name}`} name={v.full_name} status="available" style={conversationAvatarStyle} />
                                    <Conversation.Content name={v.full_name} lastSenderName="Lilly" info="Yes i can do it for you" style={conversationContentStyle} />
                                </Conversation>
                            )
                        }
                        )}
                    </ConversationList>
                </Sidebar>
                <ChatContainer style={chatContainerStyle}>
                    <ConversationHeader>
                        <ConversationHeader.Back onClick={handleBackClick} />
                        <Avatar src={`https://ui-avatars.com/api/?background=${currentChat?.bgColor}&color=fff&name=${currentChat?.full_name}`} name={currentChat?.full_name} />
                        <ConversationHeader.Content userName={currentChat?.full_name} info="Active 10 mins ago" />
                    </ConversationHeader>
                    <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
                        {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
                        {chatMessages.map((v, i) => (
                            <Message key={i} model={v}>
                                <Avatar src={"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Zoe"} name="Zoe" />
                                <Message.Footer sentTime={formatDistance(new Date(v.sentTime), new Date(), { addSuffix: true })} />
                            </Message>
                        ))}
                    </MessageList>
                    <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend={onSend} />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}

export default UserChat;