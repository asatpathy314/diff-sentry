export default {
  async email(message, env, ctx) {
    // Get comma-separated list from environment variable
    const forwardList = env.FORWARD_ADDRESSES.split(',');
    
    // Forward to all addresses in parallel
    await Promise.all(
      forwardList.map(email => message.forward(email.trim()))
    );
  }
}

