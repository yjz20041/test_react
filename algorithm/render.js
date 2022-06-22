const tree = {
    type: 'div',
    props: {
        children: [
            {
                type: 'p',
                props: {
                    children: [
                        {
                            type: 'text',
                            value: 'hello world'
                        }
                    ]
                }
            }
        ]
    }
}

const render = (tree, container) => {
    const renderDom = (node) => {
        let dom;
        const {
            type,
            props
        } = node;
        if (type === "text") {
            dom = document.createTextNode(node.value);
        } else {
            dom = document.createElement(type);
            if (props.children) {
                props.children.forEach(item => {
                    const childDom = renderDom(item);
                    dom.appendChild(childDom);
                })
            }
        }
        return dom;
    }
    const root = renderDom(tree);
    container.appendChild(root);
}