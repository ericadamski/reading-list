import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import useSWR, { mutate } from "swr";
import Item from "../components/Item";
import Button from "../components/Button";

const Home = props => {
  const { data: items } = useSWR(
    "/api/list",
    route => fetch(route).then(r => r.ok && r.json()),
    {
      initialData: props.items
    }
  );
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [authing, setAuthing] = useState();

  const { complete, reading, toRead } = items.reduce(
    (containers, item) => {
      if (item.complete) {
        containers.complete.push(item);
      } else if (item.reading) {
        containers.reading.push(item);
      } else {
        containers.toRead.push(item);
      }

      return containers;
    },
    {
      complete: [],
      reading: [],
      toRead: []
    }
  );

  useEffect(() => {
    if (title.length < 1) {
      setLink("");
    }
  }, [title]);

  const handleAddItem = async event => {
    event.preventDefault();
    setTitle("");

    // try {
    //   const { exp } = JSON.parse(localStorage.getItem("_a")) ?? {};

    //   if (!exp || Date.now() > exp) {
    //     throw new Error("Unauthorized");
    //   }
    // } catch (error) {
    //    localStorage.setItem("_a", null)
    //    setAuthing(true);
    // }

    const response = await fetch("/api/list/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ link: link.trim(), title: title.trim() })
    });

    mutate("/api/list", [...items, { _id: -1, link, title }]);
  };

  const handleCheck = item => async complete => {
    if (complete === item.complete) return;

    const updates = [...items];

    updates[items.indexOf(item)].complete = complete;

    mutate("/api/list", updates);

    const response = await fetch(`/api/item/${item._id}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complete })
    });
  };

  return (
    <>
      <div className="page">
        <div className="page__header">
          <h1 className="page__title">Reading list</h1>
          <p className="page__subtitle">
            A list of things I am currently reading, things I want to read, and
            things I have read.
          </p>
        </div>
        <div className="page__add">
          <label>Add an item</label>
          <form className="add__row" onSubmit={handleAddItem}>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
            <input
              type="text"
              placeholder="Relevant link"
              name="link"
              value={link}
              style={{ maxWidth: 500, flexGrow: 1 }}
              onChange={({ target }) => setLink(target.value)}
            />
            <Button
              type="submit"
              disabled={link?.length < 1 || title?.length < 1}
            >
              Add
            </Button>
          </form>
        </div>
        <div className="section">
          <h2 className="section__title">Currently reading</h2>
          <div className="section__items">
            {reading.length > 0 ? (
              reading.map(item => (
                <Item
                  key={item._id}
                  {...item}
                  defaultChecked={item.complete}
                  onChange={handleCheck(item)}
                />
              ))
            ) : (
              <p>Nothing here</p>
            )}
          </div>
        </div>
        <div className="section">
          <h2 className="section__title">Wanting to read</h2>
          <div className="section__items">
            {toRead.map(item => (
              <Item
                key={item._id}
                {...item}
                defaultChecked={item.complete}
                onChange={handleCheck(item)}
              />
            ))}
          </div>
        </div>
        <div className="section">
          <h2 className="section__title">Done reading</h2>
          <div className="section__items">
            {" "}
            {complete.map(item => (
              <Item
                key={item._id}
                {...item}
                onChange={handleCheck(item)}
                defaultChecked={item.complete}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .section {
          margin: 1rem 0;
        }

        .section__items {
          display: flex;
          flex-direction: column-reverse;
        }

        input {
          border: 2px solid var(--foreground);
          padding: 0.5rem;
          margin: 0;
          border-radius: var(--border-radius);
          margin-right: 0.5rem;
        }

        .page__add {
          display: flex;
          flex-direction: column;
          justify-content: center;
          border: 2px dashed var(--foreground);
          border-radius: var(--border-radius);
          margin-bottom: 2rem;
          padding: 1rem;
        }

        .page__add > label {
          font-weight: bold;
        }

        input:focus,
        input:active,
        input:hover {
          outline: none;
          border-color: var(--purple);
        }

        .add__row {
          display: flex;
          width: 100%;
        }

        .add__row > input:last-child {
          margin-right: 0;
        }

        .page__header {
          padding-top: 1rem;
          padding-bottom: 2rem;
        }

        .page__subtitle {
          margin: 0;
          padding: 0;
        }

        .page__title {
          font-size: 3rem;
        }
      `}</style>
    </>
  );
};

Home.getInitialProps = async ctx => {
  let uri;

  if (process.browser) {
    uri = new URL(location.href).origin;
  } else {
    uri = `${process.env.NODE_ENV === "production" ? "https" : "http"}://${
      ctx.req.headers.host
    }`;
  }

  const res = await fetch(`${uri}/api/list`);

  if (res.ok) {
    return {
      items: await res.json()
    };
  }

  return { items: [] };
};

export default Home;
