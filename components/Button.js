import React from "react";

export default props => (
  <>
    <button className="button" {...props} />
    <style jsx>{`
      .button {
        border: 2px solid var(${props.color || "--purple"});
        background: var(${props.color || "--purple"});
        color: var(--background);
        border-radius: var(--border-radius);
        padding: 0.5rem 1rem;
        font-size: 1rem;
        font-weight: bold;
        display: flex;
        align-items: center;
      }
      .button:hover,
      .button:active,
      .button:focus {
        outline: none;
        background: transparent;
        color: var(${props.color || "--purple"});
      }
      .button--secondary {
        background: transparent;
        border-color: transparent;
        color: var(${props.color || "--purple"});
      }
      .toggle:hover,
      .toggle:active,
      .toggle:focus {
        color: var(--yellow);
      }
      .toggle {
        outline: none;
        background: transparent;
        color: transparent;
        border-color: var(--yellow);
      }
      .toggle.selected {
        background: var(--yellow);
        border-color: var(--yellow);
        color: var(${props.color || "--purple"});
      }
      .button--secondary:hover,
      .button--secondary:focus,
      .button--secondary:active {
        border-color: var(${props.color || "--purple"});
      }
      .button[disabled] {
        pointer-events: none;
        opacity: 0.4;
      }
    `}</style>
  </>
);
