import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "@/components/ui/button";

type FileUploaderType = {
  filedChange: (FIELS: File[]) => void;
  mediaUrl: string;
};
const FileUploader = ({ filedChange }: FileUploaderType) => {
  const [fileUrl, setFileUrl] = useState("");
  const [fileUpload, setFileUpload] = useState<File[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFileUpload(acceptedFiles);
      filedChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fileUpload]
  );
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
    noClick: true,
  });
  return (
    <div
      className="flex flex-col flex-center bg-dark-3 rounded-xl cursor-pointer"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
          <div className="flex flex-1 p-5 justify-center w-full lg:p-10">
            <img src={fileUrl} alt="image" className="file-uploader-img" />
          </div>
          <p onClick={open} className="file_uploader-label">
            Drag or click here to change the image
          </p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt=""
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag 'n' drop some files here,
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button type="button" onClick={open} className="shad-button_dark_4">
            Select Image to Upload
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
