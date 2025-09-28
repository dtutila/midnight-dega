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
    vim \
    iputils-ping \
    wget \
    git \
    build-essential \
    python3 \
    ca-certificates \
    gnupg \
    lsb-release \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install nvm (as root)
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh | bash

# Set up nvm environment and install Node.js
RUN /bin/bash -c "source ~/.nvm/nvm.sh && nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION} && nvm alias default ${NODE_VERSION}"

# Install Yarn 4.1.0 (using npm from nvm-installed Node.js)
RUN /bin/bash -c "source ~/.nvm/nvm.sh && npm install -g corepack && corepack enable && corepack prepare yarn@${YARN_VERSION} --activate"



# Set environment variables for PATH
ENV NVM_DIR="/root/.nvm"
ENV PATH="${NVM_DIR}/versions/node/v${NODE_VERSION}/bin:/root/.bun/bin:$PATH"

# Add nvm and bun to PATH in bashrc for interactive shells
RUN echo 'export NVM_DIR="/root/.nvm"' >> /root/.bashrc && \
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /root/.bashrc && \
    echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> /root/.bashrc
    

# Set the working directory
WORKDIR /workspace

# Verify installations
RUN /bin/bash -c "source ~/.nvm/nvm.sh && node --version && npm --version && yarn --version "

# Install Bun 1.1.20 directly from GitHub releases
RUN mkdir -p /root/.bun/bin && \
    curl -fsSL https://github.com/oven-sh/bun/releases/download/bun-v${BUN_VERSION}/bun-linux-x64.zip -o bun.zip && \
    unzip -j bun.zip "bun-linux-x64/bun" -d /root/.bun/bin && \
    rm bun.zip && \
    chmod +x /root/.bun/bin/bun && \
    /root/.bun/bin/bun --version

# Add Bun to PATH in bashrc for interactive shells
RUN echo 'export PATH="/root/.bun/bin:$PATH"' >> /root/.bashrc

# Install elizaoscli using the properly installed bun (without setting BUN_INSTALL to avoid interference)
RUN /root/.bun/bin/bun install -g @elizaos/cli@1.5.9

# Ensure bun symlink points to correct binary after elizaos installation
RUN rm -f /root/.bun/bin/bun && \
    curl -fsSL https://github.com/oven-sh/bun/releases/download/bun-v${BUN_VERSION}/bun-linux-x64.zip -o bun.zip && \
    unzip -j bun.zip "bun-linux-x64/bun" -d /root/.bun/bin && \
    rm bun.zip && \
    chmod +x /root/.bun/bin/bun && \
    /root/.bun/bin/bun --version



# Create directory for compactc binaries
RUN mkdir -p /usr/local/compactc

# Download and install compactc
RUN wget https://d3fazakqrumx6p.cloudfront.net/artifacts/compiler/compactc_0.24.0/compactc_v0.24.0_x86_64-unknown-linux-musl.zip -O /tmp/compactc.zip \
    && unzip /tmp/compactc.zip -d /usr/local/compactc \
    && chmod +x /usr/local/compactc/compactc.bin \
    && chmod +x /usr/local/compactc/zkir \
    && chmod +x /usr/local/compactc/compactc \
    && rm /tmp/compactc.zip

# Add compactc to PATH
ENV PATH="/usr/local/compactc:${PATH}"

# Set COMPACT_HOME environment variable
ENV COMPACT_HOME="/usr/local/compactc"
# Default command
CMD ["bash"]

