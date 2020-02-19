import GlobalStyles from "../components/GlobalStyles";

export default function App({ Component, pageProps }) {
  return (
    <GlobalStyles>
      <div className="page">
        <Component {...pageProps} />
      </div>
      <style jsx>{`
        .page {
          padding: 2rem 1rem;
        }
      `}</style>
    </GlobalStyles>
  );
}
