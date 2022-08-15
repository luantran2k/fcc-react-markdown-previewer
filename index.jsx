const { useState, useEffect } = React;
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![Logo](./logo.png)
`;

marked.setOptions({
    breaks: true,
    highlight: function (code) {
        return Prism.highlight(code, Prism.languages.javascript, "javascript");
    },
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
};

function TextArea(props) {
    useEffect(() => {
        const textarea = $("#editor");
        const lineNumbers = $(".line-numbers");
        const createLineNumber = (numberOfLines) => {
            lineNumbers.innerHTML = Array(numberOfLines)
                .fill(`<span></span>`)
                .join("");
        };
        //first load
        createLineNumber(textarea.value.split("\n").length);

        //when update
        textarea.addEventListener("keyup", (event) => {
            const numberOfLines = event.target.value.split("\n").length;
            createLineNumber(numberOfLines);
        });
        textarea.addEventListener("scroll", (e) => {
            e.preventDefault();
            console.log(a);
        });
    }, []);

    const handleEditerChange = (event) => {
        props.setMarkdown(event.target.value);
    };
    return (
        <div className="editor-block">
            <h1 id="main-title">Markdown Previewer!</h1>
            <div className="editor-container">
                <div className="line-numbers">
                    <span></span>
                </div>
                <textarea
                    id="editor"
                    value={props.markdown}
                    onChange={handleEditerChange}
                ></textarea>
            </div>
        </div>
    );
}

function Preview(props) {
    return (
        <div
            id="preview"
            dangerouslySetInnerHTML={{
                __html: marked(props.markdown, { renderer: renderer }),
            }}
        ></div>
    );
}

function SwichView(props) {
    const handleClick = (event) => {
        props.setPreview((isPreview) => {
            if (isPreview) {
                $("#root").classList.remove("active");
            } else {
                $("#root").classList.add("active");
            }
            return !isPreview;
        });
    };
    return (
        <button id="switch-view" onClick={handleClick}>
            {props.name}
        </button>
    );
}

function App(props) {
    const [markdown, setMarkdown] = useState(placeholder);
    const [isPreview, setPreview] = useState(false);

    return (
        <>
            <TextArea markdown={markdown} setMarkdown={setMarkdown} />
            <Preview markdown={markdown} />
            <SwichView
                name={isPreview ? "Preview" : "Markdown"}
                isPreview={isPreview}
                setPreview={setPreview}
            />
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
