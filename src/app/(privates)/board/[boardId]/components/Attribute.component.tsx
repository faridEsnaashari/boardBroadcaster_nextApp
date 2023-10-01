"use client";

import { AttributeProps } from "../types.type";
import styles from "../styles/attribute.style.module.css";

export default function Attribute({
  shapeName,
  attribute,
  value,
}: AttributeProps) {
  return (
    <div className={styles.attribute}>
      <label>{attribute}</label>
      <br></br>
      <input
        type="text"
        name={attribute}
        id={shapeName}
        value={value}
        readOnly
      />
    </div>
  );
}
