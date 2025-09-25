import { describe, it, beforeAll, afterAll, beforeEach, afterEach, expect } from '@jest/globals';
import {
  TestValidator,
  TestResult,
  TestResultFormatter,
  TestLogger,
  WaitUtils,
  DEFAULT_ELIZA_CONFIG
} from './helpers.js';
import { createElizaClient, IElizaClient } from './eliza-client.js';

/**
 * Eliza Integration Tests for Midnight MCP Server
 * 
 * These tests validate the complete integration between Eliza AI agents
 * and the Midnight MCP server through HTTP API calls.
 * 
 * NEW: Enhanced response handling with content validation
 * - Tests now use content validation to wait for specific information in responses
 * - Multiple messages in responses are handled properly
 * - Timeout limits have been increased to accommodate longer response times
 * - Tests continue waiting until expected content is found
 * 
 * CONFIGURATION: Tests run sequentially to ensure proper integration flow
 * - Each test waits for the previous one to complete
 * - 10-second delays added between tests for stability
 * 
 * Prerequisites:
 * - Docker backend is up and running
 * - Eliza AI agents are up and running
 * - All services are accessible via HTTP
 */

describe('Eliza Integration Tests', () => {
  let elizaClient: IElizaClient;
  let logger: TestLogger;
  let testResults: Array<{ name: string; result: TestResult }> = [];

  beforeAll(async () => {
    logger = new TestLogger('ELIZA-E2E');
    elizaClient = createElizaClient({
      baseUrl: DEFAULT_ELIZA_CONFIG.baseUrl,
      timeout: 60000, // Increased from 15000 to 60000 (60 seconds)
      retries: DEFAULT_ELIZA_CONFIG.retries,
      logger: logger
    });
    
    logger.info('Starting Eliza Integration Tests');
    logger.info(`Eliza API URL: ${DEFAULT_ELIZA_CONFIG.baseUrl}`);
    // clear the channel history
    const clearResponse = await elizaClient.clearChannelHistory('4af73091-392d-47f5-920d-eeaf751e81d2');
    if (!clearResponse.success) {
      throw new Error(`Failed to clear channel history: ${clearResponse.error}`);
    }
    
    // Wait for services to be ready
    await WaitUtils.wait(2000);
  });

  afterAll(async () => {
    logger.info('Eliza Integration Tests completed');
    logger.info(TestResultFormatter.formatSummary(testResults));
  });

  /**
   * WALLET TESTS
   */
  describe('Wallet Functionality', () => {
    
    describe('Wallet Status', () => {
      it('01 - should check conversation history is empty', async () => {
        const testName = 'Check Conversation History';
        logger.info(`Running: ${testName}`);
        
        const response = await elizaClient.getChannelMessages('4af73091-392d-47f5-920d-eeaf751e81d2');
        expect(response.success).toBe(true);
        expect(response.messages.length).toBe(0);
        
        // Wait between tests for sequential execution
        await WaitUtils.waitBetweenTests(logger);
      }, 180000); 

      it('02 - should verify balance extraction works with actual response format', async () => {
        const testName = 'Verify Balance Extraction';
        logger.info(`Running: ${testName}`);
        
        // Test with the actual response format
        const testResponse = "Your current wallet balance is **51.535228**. There are no pending transactions at the moment, so that's the amount available for you to use. If you have any other questions or need assistance with anything else, feel free to ask!";
        
        const balance = TestValidator.extractBalance(testResponse);
        const hasNumbers = TestValidator.createNumberValidator()(testResponse);
        
        expect(balance).toBe('51.535228');
        expect(hasNumbers).toBe(true);
        
        // Wait between tests for sequential execution
        await WaitUtils.waitBetweenTests(logger);
      }, 180000);

      it('03 - should check wallet status', async () => {
        const testName = 'Check Wallet Status';
        logger.info(`Running: ${testName}`);
        
        const response = await elizaClient.sendMessage('What is the midnight wallet status?', {
          waitForResponse: true,
          contentValidator: TestValidator.createWalletInfoValidator(),
        });
        
        const responseContent = response.response?.[0]?.content || null;
        const result: TestResult = {
          passed: response.success && TestValidator.hasWalletStatusInfo(responseContent || ''),
          message: response.success ? 
            `Wallet status check successful. Response: ${responseContent?.substring(0, 200) || 'No content'}...` :
            `Failed to check wallet status: ${response.error}`,
          data: { responseContent, response },
          error: response.error
        };
        
        testResults.push({ name: testName, result });
        expect(result.passed).toBe(true);
        
        // Wait between tests for sequential execution
        await WaitUtils.waitBetweenTests(logger);
      }, 180000); 

      it('04 - should get wallet address', async () => {
        const testName = 'Get Wallet Address';
        logger.info(`Running: ${testName}`);
        
        const response = await elizaClient.sendMessage('What is my wallet address?', {
          waitForResponse: true,
          contentValidator: TestValidator.createWalletAddressValidator(),
        });
        
        const responseContent = response.response?.[0]?.content || null;
        const walletAddress = responseContent ? TestValidator.extractWalletAddress(responseContent) : null;
        const result: TestResult = {
          passed: response.success && responseContent && TestValidator.hasValidAddress(responseContent),
          message: response.success ? 
            `Wallet address retrieved successfully: ${walletAddress}` :
            `Failed to get wallet address: ${response.error}`,
          data: { 
            responseContent,
            walletAddress,
            isValidMidnight: walletAddress ? TestValidator.isValidMidnightAddress(walletAddress) : false,
            isValidHex: walletAddress ? TestValidator.isValidHexAddress(walletAddress) : false
          },
          error: response.error
        };
        
        testResults.push({ name: testName, result });
        console.log('result', result);
        expect(result.passed).toBe(true);
        
        // Wait between tests for sequential execution
        await WaitUtils.waitBetweenTests(logger);
      }, 180000); 

      it('05 - should get wallet balance', async () => {
        const testName = 'Get Wallet Balance';
        logger.info(`Running: ${testName}`);
        
        const response = await elizaClient.sendMessage('What is my balance?', {
          waitForResponse: true,
          contentValidator: TestValidator.createNumberValidator(),
        });
        
        const responseContent = response.response?.[0]?.content || null;
        const balance = responseContent ? TestValidator.extractBalance(responseContent) : null;
        const hasNumbers = responseContent ? TestValidator.createNumberValidator()(responseContent) : false;
        
        const result: TestResult = {
          passed: response.success && responseContent && hasNumbers,
          message: response.success ? 
            `Wallet balance query completed. Balance: ${balance || 'not extracted'}, Has numbers: ${hasNumbers}` :
            `Failed to get balance: ${response.error}`,
          data: { responseContent, balance, hasNumbers },
          error: response.error
        };

        // Relevant log to keep, numbers and balance do receive more than one message
        console.log('result', result.message);
        
        testResults.push({ name: testName, result });
        expect(result.passed).toBe(true);
        
        // Wait between tests for sequential execution
        await WaitUtils.waitBetweenTests(logger);
      }, 180000); 

      it('06 - should get wallet configuration', async () => {
        const testName = 'Get Wallet Configuration';
        logger.info(`Running: ${testName}`);
        
        const response = await elizaClient.sendMessage('What is the wallet configuration?', {
          waitForResponse: true,
        });
        
        const responseContent = response.response?.[0]?.content || null;
        const result: TestResult = {
          passed: response.success && responseContent && TestValidator.hasWalletStatusInfo(responseContent),
          message: response.success ? 
            `Wallet configuration retrieved successfully. Response: ${responseContent?.substring(0, 200) || 'No content'}...` :
            `Failed to get wallet configuration: ${response.error}`,
          data: { responseContent, response },
          error: response.error
        };
        
        testResults.push({ name: testName, result });
        expect(result.passed).toBe(true);
      }, 180000); 
    });

    describe('Transaction Operations', () => {
      it('07 - should send funds to a sample address', async () => {
        const testName = 'Send Funds to Sample Address';
        logger.info(`Running: ${testName}`);
        
        const sampleAddress = 'mn_shield-addr_test19xcjsrp9qku2t7w59uelzfzgegey9ghtefapn9ga3ys5nq0qazksxqy9ej627ysrd0946qswt8feer7j86pvltk4p6m63zwavfkdqnj2zgqp93ev';
        const amount = '1'; // 1 DUST units
        
        const response = await elizaClient.sendMessage(
          `Send ${amount} dust units to address ${sampleAddress}`, {

            waitForResponse: true,

          }
        );
        
        const responseContent = response.response?.[0]?.content || null;
        const transactionId = responseContent ? TestValidator.extractTransactionId(responseContent) : null;
        const result: TestResult = {
          passed: response.success && responseContent && (TestValidator.hasSuccessIndicators(responseContent) || transactionId !== null),
          message: response.success ? 
            `Funds sent successfully. Transaction ID: ${transactionId || 'not extracted'}` :
            `Failed to send funds: ${response.error}`,
          data: { 
            responseContent,
            destinationAddress: sampleAddress,
            amount,
            transactionId 
          },
          error: response.error
        };
        
        testResults.push({ name: testName, result });
        expect(result.passed).toBe(true);
      }, 180000); 

      it('08 - should verify a transaction that has not been received can be handled', async () => {
        const testName = 'Verify Non-Existent Transaction';
        logger.info(`Running: ${testName}`);
        
        const fakeTransactionId = 'fake-transaction-id-12345';
        const response = await elizaClient.sendMessage(
          `Verify transaction ${fakeTransactionId}`, {
            waitForResponse: true,
            contentValidator: TestValidator.createTransactionVerificationValidator(),
          }
        );
        
        const responseContent = response.response?.[0]?.content || null;
        
        const result: TestResult = {
          passed: response.success && responseContent && (
            TestValidator.hasErrorIndicators(responseContent) || 
            responseContent.toLowerCase().includes('not found') ||
            responseContent.toLowerCase().includes('not received') ||
            responseContent.toLowerCase().includes('does not exist') ||
            responseContent.toLowerCase().includes('doesn\'t exist') ||
            responseContent.toLowerCase().includes('no activity associated')
          ),
          message: response.success ? 
            `Transaction verification completed. Expected not found result: ${responseContent?.substring(0, 200) || 'No content'}...` :
            `Failed to verify transaction: ${response.error}`,
          data: { responseContent, transactionId: fakeTransactionId },
          error: response.error
        };
        
        testResults.push({ name: testName, result });
        expect(result.passed).toBe(true);
      }, 130000);

    });
  });

  /**
   * MARKETPLACE TESTS
   */
  describe('Marketplace Functionality', () => {
    
    describe('Authentication and Status', () => {
      it('09 - should check marketplace login status', async () => {
        const testName = 'Check Marketplace Login Status';
        logger.info(`Running: ${testName}`);
        
        const response = await elizaClient.sendMessage('Am I logged into the marketplace?', {
          waitForResponse: true,
          contentValidator: TestValidator.createAuthenticationStatusValidator(),
        });
        
        const responseContent = response.response?.[0]?.content || null;
        const isAuthenticated = responseContent ? TestValidator.hasAuthenticationSuccess(responseContent) : false;
        const isNotAuthenticated = responseContent ? TestValidator.hasAuthenticationFailure(responseContent) : false;
        const requiresAuth = responseContent ? TestValidator.hasAuthenticationRequired(responseContent) : false;
        
        // The test should only pass if the user IS authenticated
        // It should fail if the user is not authenticated or if there are conflicting statuses
        const hasConflictingStatus = isAuthenticated && isNotAuthenticated;
        
        const result: TestResult = {
          passed: response.success && responseContent && isAuthenticated && !hasConflictingStatus,
          message: response.success ? 
            `Marketplace login status checked. Authenticated: ${isAuthenticated}, Not authenticated: ${isNotAuthenticated}, Requires auth: ${requiresAuth}. Response: ${responseContent?.substring(0, 200) || 'No content'}...` :
            `Failed to check marketplace login: ${response.error}`,
          data: { 
            responseContent, 
            isAuthenticated, 
            isNotAuthenticated, 
            requiresAuth,
            hasConflictingStatus,
            response 
          },
          error: response.error
        };
        
        testResults.push({ name: testName, result });
        expect(result.passed).toBe(true);
      }, 180000); 
    });

    describe('Service Management', () => {
      it('10 - should list available services', async () => {
        const testName = 'List Available Services';
        logger.info(`Running: ${testName}`);
        
        const response = await elizaClient.sendMessage('List services available in the marketplace', {
          waitForResponse: true,
          contentValidator: TestValidator.createMarketplaceServicesListValidator(),
        });
        
        const responseContent = response.response?.[0]?.content || null;
        
        // Use the validator's helper methods to check the response
        const hasNoServicesPattern = responseContent ? TestValidator.hasNoServicesPattern(responseContent) : false;
        const hasServiceCount = responseContent ? TestValidator.hasServiceCountPattern(responseContent) : false;
        const hasServiceDescription = responseContent ? TestValidator.hasServiceDescriptionPattern(responseContent) : false;
        const hasServiceList = responseContent ? TestValidator.hasServiceListPattern(responseContent) : false;
        
        const result: TestResult = {
          passed: response.success && responseContent && (hasNoServicesPattern || hasServiceCount || hasServiceDescription || hasServiceList),
          message: response.success ? 
            `Services list query completed. No services pattern: ${hasNoServicesPattern}, Service count: ${hasServiceCount}, Service description: ${hasServiceDescription}, Service list: ${hasServiceList}. Response: ${responseContent?.substring(0, 200) || 'No content'}...` :
            `Failed to list services: ${response.error}`,
          data: { 
            responseContent, 
            hasNoServicesPattern,
            hasServiceCount,
            hasServiceDescription,
            hasServiceList,
            response 
          },
          error: response.error
        };
        
        testResults.push({ name: testName, result });
        expect(result.passed).toBe(true);
      }, 130000);

      it('11 - should register a new service', async () => {
        const testName = 'Register New Service';
        logger.info(`Running: ${testName}`);
        
        const serviceName = 'Test Service';
        const serviceDescription = 'A test service for E2E testing';
        const sampleAddress = 'mn_shield-addr_test19xcjsrp9qku2t7w59uelzfzgegey9ghtefapn9ga3ys5nq0qazksxqy9ej627ysrd0946qswt8feer7j86pvltk4p6m63zwavfkdqnj2zgqp93ev';
        
        const response = await elizaClient.sendMessage(
          `Register a new service and return the service id, the service is called "${serviceName}" with description "${serviceDescription}" price 25 DUST and to receive payment at address ${sampleAddress} and private privacy`, {
            waitForResponse: true,
            contentValidator: TestValidator.createMarketplaceServiceRegistrationValidator(),
          }
        );
        
        const responseContent = response.response?.[0]?.content || null;
        const result: TestResult = {
          passed: response.success && responseContent && (
            TestValidator.hasSuccessIndicators(responseContent) || 
            responseContent.toLowerCase().includes('registered') ||
            responseContent.toLowerCase().includes('created')
          ),
          message: response.success ? 
            `Service registration attempted: ${responseContent?.substring(0, 200) || 'No content'}...` :
            `Failed to register service: ${response.error}`,
          data: { responseContent, serviceName, serviceDescription },
          error: response.error
        };
        
        testResults.push({ name: testName, result });
        expect(result.passed).toBe(true);
      }, 180000); 

      it('12 - should add content to a registered service', async () => {
        const testName = 'Add Content to Service';
        logger.info(`Running: ${testName}`);
        
        const content = 'This is test content for the service';
        
        const response = await elizaClient.sendMessage(
          `Add content to the service: "${content}"`, {
            waitForResponse: true,
            contentValidator: TestValidator.createServiceContentStorageValidator(),
          }
        );
        
        const responseContent = response.response?.[0]?.content || null;
        const result: TestResult = {
          passed: response.success && responseContent && (
            TestValidator.hasSuccessIndicators(responseContent) || 
            TestValidator.hasMarketplaceInfo(responseContent)
          ),
          message: response.success ? 
            `Content addition attempted: ${responseContent?.substring(0, 200) || 'No content'}...` :
            `Failed to add content: ${response.error}`,
          data: { responseContent, content },
          error: response.error
        };
        
        testResults.push({ name: testName, result });
        expect(result.passed).toBe(true);
      }, 180000); 
    });
  });

  /**
   * INTEGRATION TESTS
   */
  describe('Extra Tests', () => {

    it('13 - should handle non sense messages gracefully', async () => {
      const testName = 'Non Sense Message Handling Test';
      logger.info(`Running: ${testName}`);
      
      // Try to access a non-existent endpoint or invalid data
      const response = await elizaClient.sendMessage('Access invalid wallet data', {
        waitForResponse: true,
        responseTimeout: 60000 // Increased from 15000 to 60000 (60 seconds)
      });
      
      const responseContent = response.response?.[0]?.content || null;
      const result: TestResult = {
        passed: response.success, // Even error responses should be handled gracefully
        message: response.success ? 
          `Error handling test completed: ${responseContent?.substring(0, 200) || 'No content'}...` :
          `Error handling test failed: ${response.error}`,
        data: { responseContent, response },
        error: response.error
      };
      
      testResults.push({ name: testName, result });
      expect(result.passed).toBe(true);
    }, 180000); 
  });
});
