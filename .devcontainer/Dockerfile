# Use Debian 13 (Trixie) as base image
FROM debian:trixie-slim

# Set environment variables
ENV NODE_VERSION=22.15.1
ENV YARN_VERSION=4.1.0
ENV BUN_VERSION=1.1.20
ENV NVM_VERSION=v0.39.7

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    build-essential \
    python3 \
    ca-certificates \
    gnupg \
    lsb-release \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN groupadd --gid 1000 node \
    && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

# Switch to the non-root user for installations
USER node

# Install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh | bash

# Set up nvm environment and install Node.js
RUN /bin/bash -c "source ~/.nvm/nvm.sh && nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION} && nvm alias default ${NODE_VERSION}"

# Install Yarn 4.1.0 (using npm from nvm-installed Node.js)
RUN /bin/bash -c "source ~/.nvm/nvm.sh && npm install -g corepack && corepack enable && corepack prepare yarn@${YARN_VERSION} --activate"

# Install Bun 1.1.20
RUN curl -fsSL https://bun.sh/install | bash -s "bun-v${BUN_VERSION}"

# Add nvm and bun to PATH in bashrc
RUN echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc && \
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc && \
    echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.bashrc && \
    echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc

# Set the working directory
WORKDIR /workspace

# Verify installations
RUN /bin/bash -c "source ~/.nvm/nvm.sh && node --version && npm --version && yarn --version && ~/.bun/bin/bun --version"

# Default command
CMD ["bash"]