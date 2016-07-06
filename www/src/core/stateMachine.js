/*******************************************************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Nicolas DAURES
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *******************************************************************************************************************/

"use strict";

import {State} from "src/core/state";


export class StateMachine
{
    //===================================================================
    // Constructors
    //===================================================================

    /**
     * Create a state machine.
     */
    constructor ()
    {
        this.states = new Map();
        this.initialStateName = null;
        this.currentStateName = null;
    }


    //===================================================================
    // Accessors
    //===================================================================

    /**
     * Get the name of the initial state.
     * @returns {null}
     */
    getInitialState()
    {
        return this.initialStateName;
    }

    /**
     * Set the name of the initial state.
     * @param name
     */
    setInitialState(name)
    {
        this.initialStateName = name;
    }

    /**
     * Get the name of the current state.
     * @returns {null}
     */
    getCurrentState()
    {
        return this.currentStateName;
    }

    /**
     * Set the name of the current state.
     * @param name
     */
    setCurrentState(name)
    {
        this.currentStateName = name;
    }


    //===================================================================
    // Operations
    //===================================================================

    /**
     * Create a state with given name and callbacks.
     * @param name : name of the state to add
     * @param updateCallback : callback called when update state
     * @param enterCallback : callback called when enter state
     * @param leaveCallback : callback called when leave state
     */
    createState(name, updateCallback, enterCallback, leaveCallback)
    {
        if (this.states.get(name) == null)
        {
            let state = new State(name, updateCallback, enterCallback, leaveCallback);
            this.states.set(state.name, state);
        }
    }

    /**
     * Create multiple states with given name and callbacks.
     * @param states : states declaration (ex: [{'state1', updateFunction}, {'state2', updateFunction, enterFunction, leaveFunction}])
     */
    createStates(states)
    {
        let self = this;
        _.forEach(states, function (stateDeclaration)
        {
            self.createState(stateDeclaration.name, stateDeclaration.updateCallback, stateDeclaration.enterCallback, stateDeclaration.leaveCallback);
        });
    }

    /**
     * Remove the state with the given name.
     * @param name : name of the state to remove
     */
    deleteState(name)
    {
        if (this.states.get(name) != null)
        {
            this.states.set(name, null);
        }
    }

    /**
     * Initialize the state machine.
     */
    initialize ()
    {
        this.currentStateName = this.initialStateName;

        let currentState = this.states.get(this.currentStateName);
        currentState.enter();
    }

    /**
     * Update the state machine.
     */
    update ()
    {
        let currentState = this.states.get(this.currentStateName);
        let nextStateName = currentState.update();

        // Go to the next state if needed
        if (nextStateName !== this.currentStateName)
        {
            let nextState = this.states.get(nextStateName);
            currentState.leave();
            nextState.enter();
        }
    }

    /**
     * Terminate the state machine.
     */
    terminate ()
    {
        let currentState = this.states.get(this.currentStateName);
        currentState.leave();
    }
}

console.debug('StateMachine loaded');