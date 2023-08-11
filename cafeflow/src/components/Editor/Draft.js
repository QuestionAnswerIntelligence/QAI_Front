// import { convertToRaw } from "draft-js";
// import draftToHtml from "draftjs-to-html";
// import { useEffect, useState } from "react";
// import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import draftjsToHtml from "draftjs-to-html";

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// import "./Draft.module.css";

// const Draft = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [htmlString, setHtmlString] = useState("");

//   const handleSave = () => {
//     const rawContentState = convertToRaw(editorState.getCurrentContent());
//     const htmlOutput = draftToHtml(rawContentState);

//     // Here, you can save the `htmlOutput` to your backend or perform other tasks
//     console.log(htmlOutput);
//   };

//   const updateTextDescription = async (state) => {
//     await setEditorState(state);
//     const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
//     setHtmlString(html);
//   };

//   const uploadCallback = () => {
//     console.log("이미지 업로드");
//   };

//   return (
//     <>
//       <div className="Draft_Container">
//         <Editor
//           placeholder="게시글을 작성해주세요"
//           editorState={editorState}
//           onEditorStateChange={updateTextDescription}
//           toolbar={{
//             image: { uploadCallback: uploadCallback },
//           }}
//           localization={{ locale: "ko" }}
//           editorStyle={{
//             height: "400px",
//             width: "80%",
//             border: "3px solid lightgray",
//             padding: "20px",
//             color: "black",
//           }}
//         />
//         <button onClick={handleSave}>Save</button>
//       </div>
//     </>
//   );
// };

// export default Draft;
