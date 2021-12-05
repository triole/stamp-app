#!/bin/bash

lpy="${RDMO_APP_MP}/config/settings/local.py"

function contains(){
    r="true"
    cat "${lpy}" | grep -c "${1}" >/dev/null 2>&1  || r="false"
    echo "${r}"
}

function append(){
if [[ $(contains "${1}") == "false" ]]; then
    echo -e "Append\n\n\"${2}\"\n\nto \"${lpy}\""
    echo -e "${2}" >> "${lpy}"
fi
}

append \
    "ddp_app" \
    "sys.path.append('/home/rdmo/ddp-app')\nINSTALLED_APPS = ['ddp_app'] + INSTALLED_APPS"
