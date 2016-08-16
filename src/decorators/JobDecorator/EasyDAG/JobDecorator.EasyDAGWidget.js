/*globals define, _*/
/*jshint browser: true, camelcase: false*/

define([
    'decorators/EllipseDecorator/EasyDAG/EllipseDecorator.EasyDAGWidget',
    './PointerField.RO',
    './AttributeField.RO',
    'css!./JobDecorator.EasyDAGWidget.css'
], function (
    EllipseDecorator,
    PointerField,
    AttributeField
) {

    'use strict';

    var JobDecorator,
        DECORATOR_ID = 'JobDecorator',
        COLORS = {
            pending: '#9e9e9e',
            queued: '#cfd8dc',
            running: '#fff59d',
            canceled: '#ffcc80',
            success: '#66bb6a',
            fail: '#e57373'
        };

    // Job nodes need to be able to...
    //     - show their ports
    //     - highlight ports
    //     - unhighlight ports
    //     - report the location of specific ports
    JobDecorator = function (options) {
        options.skipAttributes = {
            name: true,
            status: true,
            execFiles: true,
            stdout: true,
            secret: true,
            jobId: true,
            debug: true
        };
        EllipseDecorator.call(this, options);
    };

    _.extend(JobDecorator.prototype, EllipseDecorator.prototype);

    JobDecorator.prototype.DECORATOR_ID = DECORATOR_ID;
    JobDecorator.prototype.AttributeField = AttributeField;
    JobDecorator.prototype.PointerField = PointerField;

    JobDecorator.prototype.getDisplayName = function() {
        return this._node.name;
    };

    JobDecorator.prototype.setAttributes = function() {
        EllipseDecorator.prototype.setAttributes.call(this);
        var attrs = this._node.attributes,
            status = attrs.status && attrs.status.value,
            opAttrs = Object.keys(this._node.opAttributes);

        // Update the color based on the 'status' attr
        this.color = COLORS[status] || COLORS.fail;

        // Set _attributes from opAttributes
        for (var i = opAttrs.length; i--;) {
            this._attributes[opAttrs[i]] = this._node.opAttributes[opAttrs[i]];
        }
    };

    return JobDecorator;
});
