const { useContext, useEffect, useRef, useState } = React;

const ModeContext = React.createContext();

const Quote = ({ deleteQuote, quote }) => {
  const mode = useContext(ModeContext);

  const deleteElem = mode === 'admin'
    ? <button onClick={() => deleteQuote(quote) }>Delete</button>
    : '';

  return (
    <section className="quote">
      <blockquote>{ quote }</blockquote>
      { deleteElem }
    </section>
  );
};

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

  useEffect(() => {
    document.title = `Showing ${quotes.length} ${quotes.length > 1 ? 'quotes': 'quote'}!`;
  });

  const deleteQuote = (quote) => {
    setQuotes((quotes) => quotes.filter((q) => q !== quote));
  };

  const addQuote = (quote) => {
    setQuotes((quotes) => [...quotes, quote]);
  };

  const quoteElems = quotes.map((quote, i) => <Quote key={i} quote={ quote } deleteQuote={ deleteQuote } />);

  return (
    <ModeContext.Provider value={ 'admin' }>
      <section>
        { quoteElems }
      </section>
      <Form addQuote={ addQuote } />
    </ModeContext.Provider>
  );
};

ReactDOM.render(<App data={ window.__DATA__ } />, document.getElementById('root'));
