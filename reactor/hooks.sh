
function hook_build () {
  info "Installing Knowledge Interface dependencies ..."
  cd "${__knowledge_interface_project_dir}"
  npm install 1>>"$(logfile)" 2>&1
}
