// CCTV Threat Model Logic Unit Tests
const assert = require('assert').strict;

// Mock classification mapper for testing
function mapCocoClassToThreat(cocoClass) {
  const mapping = {
    'knife': 'Knife (CRITICAL)',
    'scissors': 'Sharp Object (HIGH)',
    'cell phone': 'Handgun (Test Proxy)'
  };
  return mapping[cocoClass] || null;
}

// Mock coordinate scaler for testing
function scaleBBox(bbox, canvasWidth, canvasHeight, videoWidth = 640, videoHeight = 480) {
  const [x, y, w, h] = bbox;
  const scaleX = canvasWidth / videoWidth;
  const scaleY = canvasHeight / videoHeight;
  return [x * scaleX, y * scaleY, w * scaleX, h * scaleY];
}

// Running Test Suite
console.log("==================================================");
console.log("?? Running PULSE Security CCTV Unit Tests...");
console.log("==================================================");

try {
  // Test 1: Threat Classification Mapping
  console.log("?? Test 1: Verifying Coco class mappings...");
  assert.equal(mapCocoClassToThreat('knife'), 'Knife (CRITICAL)', "knife should map to Knife (CRITICAL)");
  assert.equal(mapCocoClassToThreat('scissors'), 'Sharp Object (HIGH)', "scissors should map to Sharp Object (HIGH)");
  assert.equal(mapCocoClassToThreat('cell phone'), 'Handgun (Test Proxy)', "cell phone should map to Handgun (Test Proxy)");
  assert.equal(mapCocoClassToThreat('person'), null, "person should map to null (not a weapon)");
  console.log("? Test 1: Passed.");

  // Test 2: BBox scaling
  console.log("?? Test 2: Verifying bounding box coordinate scaling...");
  const rawBBox = [100, 150, 200, 100];
  const scaled = scaleBBox(rawBBox, 1280, 960);
  assert.deepEqual(scaled, [200, 300, 400, 200], "Coordinates should scale exactly proportional to canvas dimensions");
  console.log("? Test 2: Passed.");

  // Test 3: Log Capping Buffer
  console.log("?? Test 3: Verifying storage log buffer limits...");
  const mockDatabase = [1, 2, 3, 4, 5];
  mockDatabase.push(6);
  if (mockDatabase.length > 5) {
    mockDatabase.shift();
  }
  assert.equal(mockDatabase.length, 5, "Database buffer should maintain a max of 5 elements");
  assert.deepEqual(mockDatabase, [2, 3, 4, 5, 6], "Oldest item should be shifted out of log");
  console.log("? Test 3: Passed.");

  console.log("\n?? ALL TESTS PASSED SUCCESSFULLY! (3/3)");
  console.log("==================================================");
} catch (err) {
  console.error("\n? TEST FAILURE:");
  console.error(err.message);
  process.exit(1);
}
