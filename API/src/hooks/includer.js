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

    function loopIncluder(toLoopOn) {
        var toFill = [];
        toLoopOn.forEach(toInclude => {
            if (isJSON(toInclude)) {
                const nested = JSON.parse(toInclude);

                if (nested.name && nested.include && nested.limit && nested.skip && Array.isArray(nested.include)) {
                    if (nested.name in context.service.Model.associations) {
                        toFill.push({
                            model: context.app.service(nested.name).Model,
                            include: loopIncluder(nested.include),
                            limit: nested.limit,
                            offset: nested.skip
                        });
                    }
                } else if (nested.name && nested.include) {
                    if (nested.name in context.service.Model.associations) {
                        toFill.push({
                            model: context.app.service(nested.name).Model,
                            include: loopIncluder(nested.include)
                        });
                    }
                }
            } else {
                if (toInclude in context.service.Model.associations || toInclude.slice(0, -1) in context.service.Model.associations) {
                    toFill.push({
                        model: context.app.service(toInclude).Model,
                    });
                }
            }
        });

        return toFill;
    };

    if(Array.isArray($include)) {
    
        let include = loopIncluder($include);
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