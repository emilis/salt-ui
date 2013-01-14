/**
A custom X-Tag mixin for setting up two-way data binding (via Rivets) between
the custom X-Tag element and the model specified as an attribute on the tag.

@example
    <x-my-tag data-model="mymodel"></x-my-tag>
**/
define(['models/init', 'rivets'], function(models, rivets) {
    'use strict';

    var datamodel = {
        onCreate: function() {
            var that = this,
                model = models[this.dataset.model];

            // Bail out if we can't find the specified model
            if (!model || !model.get_result) {
                throw new Error('Model not found:', this);
            }

            if (!this.get_template) {
                throw new Error('Missing get_template attribute: ' + this);
            }

            model.get_result().then(function(result) {
                that.innerHTML = that.get_template();
                rivets.bind(that, {
                    model: model,
                    result: result,
                    vm: that.xtag,
                });
            }).done();
        },
    };

    return datamodel;
});
