const { merge } = require('lodash');

function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

module.exports = (context) => {
    const { $include } = context.params.query;

    // Remove from the query so that it doesn't get included
    // in the actual database query
    delete context.params.query.$include;

    function loopIncluder(toLoopOn, currentScope = "") {
        var toFill = [];
        toLoopOn.forEach(toInclude => {
            console.log(toInclude);
            if (isJSON(toInclude)) {
                const nested = JSON.parse(toInclude);
                // console.log(nested);

                if (nested.name && nested.include && nested.limit && nested.skip && Array.isArray(nested.include)) {
                    if (nested.name in context.service.Model.associations) {
                        toFill.push({
                            model: context.app.service(nested.name).Model,
                            include: loopIncluder(nested.include, nested.name),
                            limit: nested.limit,
                            offset: nested.skip
                        });
                    }
                } else if (nested.name && nested.include) {
                    if (nested.name in context.service.Model.associations) {
                        toFill.push({
                            model: context.app.service(nested.name).Model,
                            include: loopIncluder(nested.include, nested.name),
                        });
                    }
                }
            } else {
                var includes = toInclude.split(":");
                if (includes[0] in context.service.Model.associations || includes[0].slice(0, -1) in context.service.Model.associations) {
                    if (includes[1]) {
                        toFill.push({
                            model: context.app.service(includes[0]).Model,
                            as: includes[1]
                        });
                    } else {
                        toFill.push({
                            model: context.app.service(includes[0]).Model,
                        });
                    }
                } else if (includes[0] in context.app.service(currentScope).Model.associations || includes[0].slice(0, -1) in context.app.service(currentScope).Model.associations) {
                    if (includes[1]) {
                        toFill.push({
                            model: context.app.service(includes[0]).Model,
                            as: includes[1]
                        });
                    } else {
                        toFill.push({
                            model: context.app.service(includes[0]).Model,
                        });
                    }
                }
            }
        });
        console.log("INCLUDE\n")
        console.log(toFill);
        console.log("\n");
        return toFill;
    };

    if(Array.isArray($include)) {
    
        let include = loopIncluder($include, "");
        if (include) {
            context.params.sequelize = context.params.sequelize || {};
            merge(context.params.sequelize, {
                include,
                raw: false,
            });
        }
    }
    // return Promise.resolve(context);
    return context;
};