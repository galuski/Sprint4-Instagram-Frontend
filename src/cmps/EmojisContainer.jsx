import React from 'react';
const { useState, useEffect, useRef } = React
import EmojiPicker from 'emoji-picker-react';
import { Emoji, EmojiStyle } from 'emoji-picker-react';

export default function EmojiContainer({ onEmojiSelect }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState("")
    const [inputValue, setInputValue] = useState("")
    const emojiPickerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function onClick(emojiData, event) {
        const emoji = emojiData.isCustom ? emojiData.unified : emojiData.emoji
        onEmojiSelect(emoji)
    }

    return (
        <div className='emojis-container'>
            {<Emoji unified={selectedEmoji} size={28} />}

            <EmojiPicker onEmojiClick={onClick} />
        </div>
    );
}