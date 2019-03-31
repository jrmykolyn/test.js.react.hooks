const { useRef, useState } = React;

const data = {
  quotes: [
    'Two possibilities exist: Either we are alone in the Universe or we are not. Both are equally terrifying.',
  ],
};

const Quote = ({ quote }) => <section><blockquote>{ quote }</blockquote></section>;

const Form = ({ addQuote }) => {
  const textareaElem = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    addQuote(textareaElem.current.value);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <textarea name="text" ref={ textareaElem }></textarea>
      <button>Submit</button>
    </form>
  );
};

const App = ({ data }) => {
  const [quotes, setQuotes] = useState(data.quotes);
  const quoteElems = quotes.map((quote, i) => <Quote key={i} quote={ quote } />);

  const addQuote = (quote) => {
    setQuotes((quotes) => [...quotes, quote]);
  };

  return (
    <main>
      <section>
        { quoteElems }
      </section>
      <Form addQuote={ addQuote } />
    </main>
  );
};

ReactDOM.render(<App data={ data } />, document.getElementById('root'));
