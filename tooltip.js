export default {
    updateTooltip(el, value) {
        if (typeof value === "string") {
            // we can pass either a string
            el.setAttribute("data-v-tooltip", value);
        } else {
            // or an object
            if (value.text) {
                el.setAttribute("data-v-tooltip", value.text);
            }
            if (value.theme) {
                // if there is a prop global: true then mutate the :root css variables
                // otherwise it adds given variables to the element, which makes it possible to be different than others
                const targetEl = value.global ? document.documentElement : el;
                for (const [key, val] of Object.entries(value.theme)) {
                    if (key === "placement") {
                        switch (val) {
                            case "top":
                                targetEl.style.setProperty(
                                    "--v-tooltip-left",
                                    "50%"
                                );
                                targetEl.style.setProperty(
                                    "--v-tooltip-top",
                                    "0%"
                                );
                                targetEl.style.setProperty(
                                    "--v-tooltip-translate3d",
                                    "translate3d(-50%, -110%, 0)"
                                );
                                break;
                            case "bottom":
                                targetEl.style.setProperty(
                                    "--v-tooltip-left",
                                    "50%"
                                );
                                targetEl.style.setProperty(
                                    "--v-tooltip-top",
                                    "100%"
                                );
                                targetEl.style.setProperty(
                                    "--v-tooltip-translate3d",
                                    "translate3d(-50%, 10%, 0)"
                                );
                                break;
                            case "left":
                                targetEl.style.setProperty(
                                    "--v-tooltip-left",
                                    "0%"
                                );
                                targetEl.style.setProperty(
                                    "--v-tooltip-top",
                                    "50%"
                                );
                                targetEl.style.setProperty(
                                    "--v-tooltip-translate3d",
                                    "translate3d(-110%, -50%, 0)"
                                );
                                break;
                            case "right":
                                targetEl.style.setProperty(
                                    "--v-tooltip-left",
                                    "100%"
                                );
                                targetEl.style.setProperty(
                                    "--v-tooltip-top",
                                    "50%"
                                );
                                targetEl.style.setProperty(
                                    "--v-tooltip-translate3d",
                                    "translate3d(10%, -50%, 0)"
                                );
                                break;
                            default:
                                break;
                        }
                    } else {
                        targetEl.style.setProperty(`--v-tooltip-${key}`, val);
                    }
                }
            }
        }
    },
    // hooks
    beforeMount(el, { value, dir }) {
        // v-tooltips with global prop won't show the tooltip
        if (!value.global) {
            el.classList.add("data-v-tooltip");
        }
        // to use functions in Vue's directives which are inside this object, we can't use this, we have to use dir, which is the directive object
        dir.updateTooltip(el, value);
    },
    updated(el, { value, dir }) {
        dir.updateTooltip(el, value);
    },
};
