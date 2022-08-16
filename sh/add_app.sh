#!/bin/bash

srcfol="${RDMO_APP_MP}"
if [[ -z "${srcfol}" ]]; then
    srcfol="${RDMO_APP}"
fi
if [[ -z "${srcfol}" ]]; then
    echo "can not find rdmo source folder"
    exit 1
fi

lpy="${RDMO_APP_MP}/config/settings/local.py"

function contains() {
    r="true"
    cat "${lpy}" | grep -c "${1}" >/dev/null 2>&1 || r="false"
    echo "${r}"
}

function append() {
    if [[ $(contains "${1}") == "false" ]]; then
        echo -e "Append\n\n\"${2}\"\n\nto \"${lpy}\n\""
        echo -e "${2}" >>"${lpy}"
    fi
}

impsys=""
cat "${lpy}" | grep "import sys" >/dev/null 2>&1 || impsys="import sys"

append \
    "ddp_app" \
    "${impsys}\nsys.path.append('/home/rdmo/ddp-app')\nINSTALLED_APPS = ['ddp_app'] + INSTALLED_APPS"
