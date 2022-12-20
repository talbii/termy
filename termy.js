/* markdownize(s) does simple astersik replacement, according to Markdown rules, i.e.,:
 *  **x** => <b> x </b>
 *  *x*   => <em> x </em>
 * 
 *  The function returns a new string, s', with these replacements. */ 
markdownize = (s) =>
    s.replace(/\*{2}([^*]+?)\*{2}/g, "<b>$1<\/b>").replace(/\*([^*]+?)\*/g, "<em>$1<\/em>")
;

let data = document.getElementById("termy-editor");
let target = document.getElementById("termy-output");

let termyize = (source, target) => {
    let Q = source.children;
    let QQ = target.children;

    while(QQ.length != Q.length && QQ.length > 0)
        target.removeChild(QQ.item(QQ.length - 1));

    for(var i = 0; i < Q.length; ++i) {
        let p = Q.item(i);
        let ps = p.textContent.trim();

        var s = ps;
        if(ps[0] == '$')
            s = `$ <span style='color: var(--boldcolor)'> ${ps.substring(1).trim()} </span>`;

        s = markdownize(s);
        // We now have s, the string we wish to display.
        // We should check if we need to append/update the corresponding object in target.
    
        if(i < QQ.length)
            QQ.item(i).innerHTML = s;
        else {
            var para = document.createElement("p");
            para.innerHTML = s;
            target.appendChild(para);
        }
    }
};

// Turn on the editor!
setInterval( () => termyize(data, target), 100 );
