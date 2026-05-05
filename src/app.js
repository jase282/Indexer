// Author: Jase
// GitLab: 


function replacePowersInElement(element) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                if (node.parentElement.tagName === 'SCRIPT' ||
                    node.parentElement.tagName === 'STYLE' ||
                    node.parentElement.classList?.contains('math-rendered')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const nodesToReplace = [];
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (/\d+\^\d+/.test(node.textContent)) {
            nodesToReplace.push(node);
        }
    }

    for (const node of nodesToReplace) {
        const newHtml = node.textContent.replace(/(\d+)\^(\d+)/g, '$1<sup>$2</sup>');
        const span = document.createElement('span');
        span.innerHTML = newHtml;
        span.classList.add('math-rendered');
        node.parentNode.replaceChild(span, node);
    }
}

replacePowersInElement(document.body);

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                replacePowersInElement(node);
            }
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});