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
import { useState, useEffect, useCallback, useContext } from "react";
import { formatDistance } from "date-fns";
import { IoMdLogOut } from "react-icons/io";
import { auth, signOut } from "../config/firebase";
import User from "../context/user";

function UserChat() {
    const [messageInputValue, setMessageInputValue] = useState("")
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sidebarStyle, setSidebarStyle] = useState({});
    const [chatContainerStyle, setChatContainerStyle] = useState({});
    const [conversationContentStyle, setConversationContentStyle] = useState({});
    const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});
    const user = useContext(User).user
    const [messages, setMessages] = useState(
        [
            {
                message: "Hello my friend",
                sentTime: new Date("6/02/2023"),
                sender: "Zoe",
                direction: "incoming",
                position: "single"
            }
        ]
    );

    const logout = () => {
        signOut(auth)
    }

    const onSend = () => {
        setMessages([...messages,
        {
            message: messageInputValue,
            sentTime: new Date(),
            sender: "Zoe",
            direction: "outgoing",
            position: "first"
        }])
        setMessageInputValue("")
    }

    const handleBackClick = () => setSidebarVisible(!sidebarVisible);

    const handleConversationClick = useCallback(() => {
        if (sidebarVisible) {
            setSidebarVisible(false);
        }
    }, [sidebarVisible, setSidebarVisible])

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
    const colors = ["757ce8", "f44336", '0D8ABC'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    console.log("randomColor", randomColor)
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
                        <Conversation onClick={handleConversationClick}>
                            <Avatar src={"https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=John+Doe"} name="Lilly" status="available" style={conversationAvatarStyle} />
                            <Conversation.Content name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you" style={conversationContentStyle} />
                        </Conversation>
                    </ConversationList>
                </Sidebar>
                <ChatContainer style={chatContainerStyle}>
                    <ConversationHeader>
                        <ConversationHeader.Back onClick={handleBackClick} />
                        <Avatar src={"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Zoe"} name="Zoe" />
                        <ConversationHeader.Content userName="Zoe" info="Active 10 mins ago" />
                    </ConversationHeader>
                    <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
                        {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
                        {messages.map((v, i) => (
                            <Message key={i} model={v}>
                                <Avatar src={"https://api.dicebear.com/7.x/fun-emoji/svg?seed=Zoe"} name="Zoe" />
                                <Message.Footer sentTime={formatDistance(v.sentTime, new Date(), { addSuffix: true })} />
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