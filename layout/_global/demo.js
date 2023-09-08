function LoadPjax() {
    window.pjax = new Pjax({
        selectors: [
            "head title", 'head meta[name="keywords"]', 'head meta[name="description"]', "#contain"
        ],
        cache: !0,
        cacheBust: !1
    })
}
function changeActive() {
    document.querySelectorAll("nav>a").forEach(e => {
        e.href.split("/").pop() === window.location.pathname.split("/")[1] ? e.classList.add("active") : e.classList.remove("active")
    })
}
function copyCode() {
    const e = document.querySelector(".cont");
    e && e.addEventListener("click", e => {
        const t = e.target;
        if (t.classList.contains("cp-code")) {
            const e = t.parentElement.parentElement.nextElementSibling;
            if ("TABLE" === e.tagName) {
                const n = e.querySelector(".code"),
                    o = window.getSelection();
                o.selectAllChildren(n),
                document.execCommand("copy"),
                o.removeAllRanges(),
                t.innerText = "COPIED",
                setTimeout(function () {
                    t.innerText = "COPY"
                }, 2e3)
            }
        }
    })
}
LoadPjax(),
copyCode(),
document.addEventListener("pjax:send", () => {
    document.body.classList.remove("search"),
    document.getElementById("load").classList.add("show")
}),
document.addEventListener("pjax:complete", () => {
    setTimeout(() => {
        document.getElementById("load").classList.remove("show"),
        changeActive(),
        copyCode()
    }, 200)
}),
document.addEventListener("pjax:error", e => {
    404 === e.request.status && pjax.loadUrl("/404/")
});
