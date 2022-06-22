
const normalDeps = [
    { id: 'm1', deps: ['m2', 'm3']},
    { id: 'm2', deps: ['m3', 'm4']},
    { id: 'm3', deps: ['m4']},
    { id: 'm4', deps: []}
]
    // 有循环引用
const circularDeps = [
    { id: 'm1', deps: ['m2', 'm3']},
    { id: 'm2', deps: ['m3', 'm4']},
    { id: 'm3', deps: ['m4']},
    { id: 'm4', deps: ['m1']}
]


const circularDep = (arr) => {
    const map = {};
    arr.forEach(item => {
        map[item.id] = item.deps;
    })
    const find = (id, deps) => {
        let ret = false;
        for (let i = 0; i < deps.length; i++) {
            const depId = deps[i];
            if (deps.indexOf(id) >= 0) {
                return true;
            }
            if (map[depId]) {
                ret = find(id, map[depId]);
            }
        }
        return ret;
    }
    return arr.some(item => {
        return find(item.id, map[item.id] || [])
    })
}

const circularDep2 = (arr) => {
    const map = {};
    arr.forEach(item => {
        map[item.id] = item.deps;
    });
    const dfs = (id, cache) => {
        const deps = (map[id] || []).slice();
        for (let dep of deps) {
            if (cache.indexOf(dep) >= 0) {
                continue;
            }
            cache.push(dep);
            dfs(dep, cache);
        }
    }
    return arr.some(item => {
        const deps = [];
        dfs(item.id, deps);
        return deps.indexOf(item.id) >= 0
    })
}

const circularDep3 = (arr) => {
    const map = {};
    arr.forEach(item => {
        map[item.id] = item.deps;
    });

    const find = (id, deps, path) => {
        if (!path) {
            path = [];
            path.push(id);
        }
        for (let i = 0; i < deps.length; i++) {
            const depId = deps[i];
            if (deps.indexOf(id) >= 0) {
                path.push(id);
                return path;
            }
            if (map[depId]) {
                path = path.slice();
                path.push(depId);
                const ret = find(id, map[depId], path);
                if (ret) {
                    return ret
                }
            }
        }
    }
    let ret = [];
    arr.forEach(item => {
        const circle = find(item.id, map[item.id] || []);
        if (circle) {
            ret.push(circle.join("->"))
        }
    })
    return ret;
}

console.log(circularDep3(normalDeps));
console.log(circularDep3(circularDeps));