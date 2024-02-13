#!/bin/bash

# Generate the Next.js build
npm run build

# Define local and remote directories
local_build_dir="D:/Freelance/Gizmo-front-end/Ciseco_Nextjs/CisecoNextjs/.next"  # Update this with the path to your local build directory
remote_server="146.190.110.177"
remote_user="root"
remote_dir="/ecommerce/shorol-user-panel/.next"  # Update this with the path to your remote directory

# Transfer the build to the remote server using rsync over SSH
scp -r "$local_build_dir" "$remote_user@$remote_server:$remote_dir"
