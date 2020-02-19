import React, { useRef, useState, useEffect } from "react";
import OpenGraph from "./OpenGraph";

export default props => {
  const timer = useRef();
  const [checked, setChecked] = useState(props.defaultChecked || false);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    timer.current = setTimeout(() => props.onChange(checked), 1000);
  }, [checked]);

  return (
    <>
      <div className="item">
        <input
          type="checkbox"
          checked={checked}
          onChange={({ target }) => setChecked(target.checked)}
        />
        <div className="item__details">
          <h3 className={`details__title ${checked ? "checked" : ""}`}>
            {props.title}
          </h3>
          <a className="details__link" href={props.link}>
            {props.link}
          </a>
          <OpenGraph url={props.link} />
        </div>
      </div>
      <style jsx>{`
        .item {
          display: flex;
          margin: 1rem 0;
        }

        .details__title {
            position: relative;
        }

        .details__title::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--foreground);
            transition: width 0.2s ease;
        }

        .details__title.checked::after {
            width: 100%;
        }

        input[type="checkbox"] {
          border: 2px solid var(--foreground);
          border-radius: 2px;
          appearance: none;
          width: 1.15rem;
          height: 1.15rem;
          margin: 0;
          margin-right: 1rem;
          margin-top: 0.35rem;
          position: relative;
        }

        input[type="checkbox"]:focus,
        input[type="checkbox"]:active,
        input[type="checkbox"]:hover {
            outline: none;
            border-color: var(--purple);
        }

        input[type="checkbox"]:checked {
            border-color: transparent;
        }

        input[type="checkbox"]:checked::after {
          content: "✅";
          display: flex;
          align-items: center;
          justify-content; center;
          font-size: 1.15rem;
          position: absolute;
          left: -2px;
          top: 0px;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};
