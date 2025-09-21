import React from "react";
import { Copy, Trash2 } from "lucide-react";
import type { ActionButtonsProps } from "../types";
import { Button } from "./Button";

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  transcript,
  onCopy,
  onClear,
  onDownload,
}) => {
  return (
    <>
      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-4 mb-6">
        <Button
          onClick={onCopy}
          disabled={!transcript}
          variant="warning"
          size="medium"
          shape="circular"
          icon={Copy}
          title="کپی متن"
        />

        <Button
          onClick={onClear}
          disabled={!transcript}
          variant="danger"
          size="medium"
          shape="circular"
          icon={Trash2}
          title="پاک کردن"
        />
      </div>

      {/* Save Button */}
      <Button
        onClick={onDownload}
        disabled={!transcript}
        variant="info"
        size="large"
        shape="rounded"
        title="دانلود فایل"
        fullWidth
      >
        ذخیره
      </Button>
    </>
  );
};
