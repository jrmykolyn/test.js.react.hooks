const { useState } = React;

const data = {
  quotes: [
    'Two possibilities exist: Either we are alone in the Universe or we are not. Both are equally terrifying.',
  ],
};

const App = ({ data }) => {
  const [quotes, setQuotes] = useState(data.quotes);
  const quoteElems = quotes.map((quote) => <section><blockquote>{ quote }</blockquote></section>);
  return (
    <main>{ quoteElems }</main>
  );
};

ReactDOM.render(<App data={ data } />, document.getElementById('root'));
