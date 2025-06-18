import React from "react";
import "./CardEditing.css"; // CSSは別ファイルで書く場合

const CardEditing = () => {
  return (
    <div className="edit-card-container">
      <div className="edit-name-tag">
        <h1>MyElectronicCard Editing</h1>
      </div>
      <div className="edit-container">
        <form>
          <input type="text" name="name" placeholder="name" required />
          <br />
          <input type="email" name="email" placeholder="email" required />
          <br />
          <div className="stack-grid">
            <input type="text" name="stack1" placeholder="Stack 1" />
            <input type="text" name="stack2" placeholder="Stack 2" />
            <input type="text" name="stack3" placeholder="Stack 3" />
            <input type="text" name="stack4" placeholder="Stack 4" />
          </div>
          <textarea name="bio" placeholder="comment" />
          <br />
          <div className="button-container">
            <button type="submit">保存</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardEditing;
