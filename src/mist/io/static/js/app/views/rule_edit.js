define('app/views/rule_edit', ['app/views/controlled'],
    //
    //  Rule Edit View
    //
    //  @returns Class
    //
    function (ControlledView) {

        'use strict';

        return ControlledView.extend({


            //
            //
            //  Properties
            //
            //


            rule: null,
            metrics: [],
            newCommand: null,


            //
            //
            //  Methods
            //
            //


            open: function (property) {

                this.set('rule', Mist.ruleEditController.rule);
                this.set('metrics', this._parentView.metrics);

                // Get button on which to position the popup
                var button = '#' + this.rule.id +
                    ' .rule-button.rule-' + property;

                // Reposition popup on the button
                $('#rule-' + property)
                    .popup('option', 'positionTo', button);

                // Open the popup
                Ember.run.next(function () {
                   $('#rule-' + property).popup('open');
                });
            },


            close: function (property) {
                $('#rule-' + property).popup('close');
                this.set('rule', null);
                this.set('metrics', null);
            },


            openCommandEditor: function () {
                this.close('action');
                Ember.run.later(this, function () {
                    this.open('command');
                    this.set('newCommand', this.rule.command);
                }, 500);
            },


            closeCommandEditor: function () {
                this.close('command');
                Ember.run.later(this, function () {
                    this.open('action');
                }, 500);
            },


            //
            //
            //  Actions
            //
            //


            actions: {

                metricClicked: function (metric) {
                    Mist.ruleEditController.edit({
                        metric: metric
                    });
                },


                operatorClicked: function (operator) {
                    Mist.ruleEditController.edit({
                        operator: operator
                    });
                },


                aggregateClicked: function (aggregate) {
                    Mist.ruleEditController.edit({
                        aggregate: aggregate
                    });
                },


                actionClicked: function (action) {
                    if (action == 'command')
                        this.openCommandEditor();
                    else
                        Mist.ruleEditController.edit({
                            action: action
                        });
                },


                saveClicked: function () {
                    Mist.ruleEditController.edit({
                        action: 'command',
                        command: this.newCommand
                    });
                },


                backClicked: function () {
                    this.closeCommandEditor();
                },
            },


            //
            //
            //  Observers
            //
            //
            /*
                            Ember.run.next(function () {
                                $('#' + rule.id + ' .rule-time-window')
                                    .parent().trigger('create');
                            });*/
        });
    }
);
