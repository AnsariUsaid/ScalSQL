// In an actual AWS deployment, you would use aws-sdk to invoke a sagemaker-runtime endpoint.
// const { SageMakerRuntimeClient, InvokeEndpointCommand } = require("@aws-sdk/client-sagemaker-runtime");

const generateSQL = async (question, schema) => {
  try {
    // Simulate SageMaker network latency
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    // ---- THIS IS A MOCK IMPL FOR THE PROTOTYPE ----
    // In production:
    // const client = new SageMakerRuntimeClient({ region: "us-east-1" });
    // const input = { question, schema };
    // const command = new InvokeEndpointCommand({
    //   EndpointName: "scalsql-t5-endpoint",
    //   Body: JSON.stringify(input),
    //   ContentType: "application/json"
    // });
    // const res = await client.send(command);
    // return JSON.parse(Buffer.from(res.Body).toString('utf-8')).sql;

    console.log(`[ML Simulation] Generating SQL for: "${question}"`);
    
    // Very simple mock logic just to show the prototype working end-to-end
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('how many users')) {
      return "SELECT COUNT(*) FROM users;";
    } 
    if (lowerQ.includes('revenue') || lowerQ.includes('sales')) {
      return "SELECT SUM(amount) FROM sales;";
    }
    if (lowerQ.includes('delete') || lowerQ.includes('drop')) {
      return "DROP TABLE users;"; // Let the validator catch this
    }

    // Default fallback
    return "SELECT * FROM public.users LIMIT 10;";
    
  } catch (error) {
    console.error("SageMaker Invocation Error:", error);
    throw new Error('Failed to generate SQL from ML Model.');
  }
};

module.exports = { generateSQL };
