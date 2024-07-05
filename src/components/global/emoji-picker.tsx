import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type EmojiPickerPros = {
  children: React.ReactNode;
  getValue?: (emoji: string) => void;
};

const EmojiPicker = ({ children, getValue }: EmojiPickerPros) => {
  const route = useRouter();
  const Selector = dynamic(() => import("emoji-picker-react"));

  const onClick = (selectedEmoji: any) => {
    if (getValue) getValue(selectedEmoji.emoji);
  };
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
      <PopoverContent className="p-0 border-none">
        <Selector onEmojiClick={onClick} />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
