import { useEffect } from "react";

import { CircleUserRoundIcon, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { useUploadProfilePicMutation } from "../../redux/rtkQuery/authApi";

export default function ImageUpload() {
  const [uploadProfilePicture, { isLoading: isUploading }] =
    useUploadProfilePicMutation();
  const user = useSelector((state) => state.auth.user);

  // Handle file upload when files are added
  const handleFilesAdded = async (addedFiles) => {
    if (addedFiles.length > 0) {
      const file = addedFiles[0].file;
      await uploadImageToBackend(file);
    }
  };

  // Upload image to backend using FormData
  const uploadImageToBackend = async (file) => {
    try {
      // Create FormData - this is what multer expects
      const formData = new FormData();
      formData.append("image", file); // "image" matches your multer field name

      await uploadProfilePicture(formData).unwrap();

      toast.success("Profile picture uploaded successfully.");

      // Clear the file after successful upload
      removeFile(files[0]?.id);
    } catch (err) {
      console.error("Error in uploading profilePic : ", err);
      toast.error(err);

      // Remove the file on error
      if (files[0]?.id) {
        removeFile(files[0].id);
      }
    }
  };

  const [
    { files, errors },
    { removeFile, openFileDialog, getInputProps, clearErrors },
  ] = useFileUpload({
    accept: "image/*",
    maxSize: 10 * 1024 * 1024, // 10MB limit
    onFilesAdded: handleFilesAdded, // This triggers upload when file is selected
  });

  const previewUrl = files[0]?.preview || null;

  // Show file validation errors
  useEffect(() => {
    if (errors.length > 0) {
      console.log("File validation errors:", errors);
      errors.forEach((error) => {
        if (error.includes("size") || error.includes("large")) {
          toast.error(`File size too large! Maximum size is 70KB.`);
        } else if (error.includes("type") || error.includes("format")) {
          toast.error(`Invalid file type! Only images are allowed.`);
        } else {
          toast.error(error);
        }
      });
    }
  }, [errors]);

  return (
    <div className="flex items-center gap-6 w-full min-h-[40px]">
      <div className="relative">
        <div
          className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Show preview or current user profile picture */}
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : user?.profilePic?.url ? (
            <img
              src={user.profilePic.url}
              alt="Current"
              className="w-full h-full object-cover"
            />
          ) : (
            <CircleUserRoundIcon className="w-4 h-4 text-gray-400" />
          )}
        </div>

        {/* Upload overlay effect */}
        {isUploading && (
          <div className="absolute inset-0 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              openFileDialog();
            }}
            disabled={isUploading}
            size="sm"
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin mr-1" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-3 h-3 mr-1" />
                {user?.profilePic?.url ? "Change" : "Upload"}
              </>
            )}
          </Button>

          {/* Hidden file input */}
          <input
            {...getInputProps()}
            className="sr-only"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
}
