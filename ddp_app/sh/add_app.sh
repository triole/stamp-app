#!/bin/bash

rdmo_app_fol="${RDMO_APP}"
ddp_app_fol="$(
  find / -type d 2>/dev/null | grep -E "ddp_app/sh$" | grep -Po "^.*(?=\/.*\/)"
)"

if [[ -z "${rdmo_app_fol}" ]]; then
  echo "can not find rdmo source folder"
  exit 1
fi

lpy="${rdmo_app_fol}/config/settings/local.py"

function append() {
  grp="${1}"
  if [[ -n "${2}" ]]; then
    grp="${2}"
  fi
  grep "${grp}" "${lpy}" >/dev/null 2>&1 ||
    {
      echo -e "append to ${lpy}\n  ${1}\n"
      echo -e "${1}" >>"${lpy}"
    }

}

append "import sys"
append "sys.path.append('${ddp_app_fol}')"
append "INSTALLED_APPS = ['ddp_app'] + INSTALLED_APPS" "INSTALLED_APPS = \['ddp_app'\] + INSTALLED_APPS"
append "STATICFILES_DIRS = []" "STATICFILES_DIRS = \[\]"
append "STATICFILES_DIRS.append('${ddp_app_fol}/ddp_app/static')"

cd "${rdmo_app_fol}" && python manage.py collectstatic --no-input
