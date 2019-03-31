const { useContext, useEffect, useRef, useState } = React;

const ModeContext = React.createContext();

const data = {
  quotes: [
    'Two possibilities exist: Either we are alone in the Universe or we are not. Both are equally terrifying.',
  ],
};

const Quote = ({ quote }) => <section><blockquote>{ quote }</blockquote></section>;

const Form = ({ addQuote }) => {
  const mode = useContext(ModeContext);
  const textareaElem = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    addQuote(textareaElem.current.value);
    textareaElem.current.value = '';
  };

  const output = mode === 'admin'
   ? (
     <form onSubmit={ handleSubmit }>
      <textarea name="text" ref={ textareaElem }></textarea>
      <button>Submit</button>
    </form>
   )
   : <p>Whoops! Only admins may add new quotes.</p>;

  return output;
};

const App = ({ data }) => {
  const [quotes, setQuotes] = useState(data.quotes);
  const quoteElems = quotes.map((quote, i) => <Quote key={i} quote={ quote } />);

  useEffect(() => {
    document.title = `Showing ${quotes.length} ${quotes.length > 1 ? 'quotes': 'quote'}!`;
  });

  const addQuote = (quote) => {
    setQuotes((quotes) => [...quotes, quote]);
  };

  return (
    <ModeContext.Provider value={ 'admin' }>
      <section>
        { quoteElems }
      </section>
      <Form addQuote={ addQuote } />
    </ModeContext.Provider>
  );
};

ReactDOM.render(<App data={ data } />, document.getElementById('root'));
