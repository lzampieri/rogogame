require('./bootstrap');

document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + 'px');

import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import $ from 'jquery';

window.$ = $;

createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props }) {
    render(<App {...props} />, el)
  },
})

InertiaProgress.init()