/**
 * Auto-fix ESLint errors for CribWise project
 * Run: npx tsx fix-eslint.ts
 * Or: ts-node fix-eslint.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface FileFixes {
  unusedImports?: string[];
  unusedVars?: string[];
}

// Files to fix based on your ESLint output
const filesToFix: string[] = [
  'app/admissions/deadlines/page.tsx',
  'app/admissions/guides/[slug]/page.tsx',
  'app/admissions/guides/page.tsx',
  'app/admissions/search/page.tsx',
  'app/dashboard/agent/page.tsx',
  'app/dashboard/student/page.tsx',
  'app/events/page.tsx',
  'app/faq/agents/page.tsx',
  'app/faq/students/page.tsx',
  'app/marketplace/page.tsx',
  'app/marketplace/sell/page.tsx',
  'app/materials/page.tsx',
  'app/page.tsx',
  'app/properties/page.tsx',
  'app/safety/page.tsx',
  'app/safety/tips/page.tsx',
  'app/signin/page.tsx',
  'app/verify/choose-status/page.tsx',
  'app/verify/page.tsx',
  'app/verify/verify-landlord/page.tsx',
  'components/Navbar.tsx',
  'components/gamification.tsx',
  'components/property/Map.tsx',
  'lib/marketplace.ts',
];

// Fix apostrophes and quotes in JSX
function fixQuotesAndApostrophes(content: string): string {
  // Fix apostrophes in JSX text content
  content = content.replace(/>((?:[^<>]|<(?![^>]*>))*)'((?:[^<>]|<(?![^>]*>))*)</g, (match, before, after) => {
    return `>${before}&apos;${after}<`;
  });
  
  // Fix quotes in JSX text content
  content = content.replace(/>((?:[^<>]|<(?![^>]*>))*)"((?:[^<>]|<(?![^>]*>))*)</g, (match, before, after) => {
    return `>${before}&quot;${after}<`;
  });
  
  return content;
}

// Remove unused imports
function removeUnusedImports(content: string, unusedVars: string[]): string {
  unusedVars.forEach(varName => {
    // Remove from import statements
    // Pattern 1: { X, Y, Z } - remove X
    content = content.replace(
      new RegExp(`(import\\s*{[^}]*),\\s*${varName}\\s*([,}])`, 'g'),
      '$1$2'
    );
    content = content.replace(
      new RegExp(`(import\\s*{)\\s*${varName}\\s*,`, 'g'),
      '$1'
    );
    content = content.replace(
      new RegExp(`import\\s*{\\s*${varName}\\s*}\\s*from[^;]+;?\\s*`, 'g'),
      ''
    );
  });
  
  // Clean up empty imports
  content = content.replace(/import\s*{\s*}\s*from[^;]+;?\s*/g, '');
  // Clean up trailing commas in imports
  content = content.replace(/{\s*,/g, '{');
  content = content.replace(/,\s*}/g, '}');
  
  return content;
}

// Fix any types to unknown
function fixAnyTypes(content: string): string {
  // Replace (param: any) with (param: unknown)
  content = content.replace(/\(\s*(\w+)\s*:\s*any\s*\)/g, '($1: unknown)');
  // Replace : any) with : unknown)
  content = content.replace(/:\s*any\s*\)/g, ': unknown)');
  // Replace : any, with : unknown,
  content = content.replace(/:\s*any\s*,/g, ': unknown,');
  // Replace : any; with : unknown;
  content = content.replace(/:\s*any\s*;/g, ': unknown;');
  // Replace Array<any> with Array<unknown>
  content = content.replace(/Array<any>/g, 'Array<unknown>');
  
  return content;
}

// Remove unused variable declarations
function removeUnusedVars(content: string, unusedVars: string[]): string {
  unusedVars.forEach(varName => {
    // Remove const/let/var declarations that are unused
    content = content.replace(
      new RegExp(`\\s*(?:const|let|var)\\s+${varName}\\s*=\\s*[^;]+;?\\s*`, 'g'),
      ''
    );
    // Also handle destructuring: const { x, y } = ...
    content = content.replace(
      new RegExp(`\\s*${varName}\\s*,\\s*`, 'g'),
      ''
    );
  });
  return content;
}

// File-specific fixes based on ESLint output
const fileSpecificFixes: Record<string, FileFixes> = {
  'app/admissions/deadlines/page.tsx': { unusedImports: ['Clock'] },
  'app/admissions/guides/[slug]/page.tsx': { unusedImports: ['FileText'] },
  'app/admissions/guides/page.tsx': { unusedImports: ['Search', 'Calendar', 'Mail'] },
  'app/admissions/search/page.tsx': { unusedImports: ['notFound', 'Suspense'], unusedVars: ['getProgrammeBySlugs'] },
  'app/materials/page.tsx': { unusedImports: ['Suspense'] },
  'app/page.tsx': { unusedImports: ['Input', 'Search', 'Users', 'TrendingUp', 'Clock'] },
  'app/properties/page.tsx': { unusedVars: ['cn'] },
  'app/faq/agents/page.tsx': { unusedImports: ['Card', 'CardContent'] },
  'app/faq/students/page.tsx': { unusedImports: ['Card', 'CardContent'] },
  'app/marketplace/page.tsx': { unusedImports: ['Card'] },
  'components/Navbar.tsx': { unusedVars: ['toLower'] },
  'components/gamification.tsx': { unusedImports: ['Zap', 'Plus', 'Mail', 'Home', 'Sparkles'] },
  'app/roommate/[id]/page.tsx': { unusedImports: ['AvatarImage', 'Coffee', 'Mail', 'AlertCircle'], unusedVars: ['profile', 'factors'] },
  'app/roommate/browse/page.tsx': { unusedImports: ['AvatarImage'] },
  'app/roommate/edit/page.tsx': { unusedVars: ['roommateProfile', 'handleDeactivate'] },
  'app/roommate/my-profile/page.tsx': { unusedImports: ['Coffee', 'Utensils', 'Dumbbell', 'PartyPopper', 'AlertCircle'], unusedVars: ['profile'] },
  'app/verify/choose-status/page.tsx': { unusedImports: ['Home'], unusedVars: ['profile'] },
  'app/verify/page.tsx': { unusedImports: ['Lock', 'Unlock'] },
  'app/verify/verify-landlord/page.tsx': { unusedImports: ['Upload', 'DollarSign', 'Home'] },
  'app/events/[id]/page.tsx': { unusedImports: ['Users'] },
  'app/verify-email/page.tsx': { unusedVars: ['userStatus'] },
  'app/api/report/create/route.ts': { unusedVars: ['err'] },
  'app/agent/properties/generate/page.tsx': { unusedImports: ['useEffect'], unusedVars: ['user', 'profile'] },
  'lib/materials.ts': { unusedImports: ['School'] },
  'lib/checklist.ts': { unusedImports: ['ChecklistItemState'] },
};

// Process each file
function processFile(filePath: string): void {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping ${filePath} (not found)`);
    return;
  }

  console.log(`\n🔧 Fixing ${filePath}...`);
  
  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;
  
  // Apply fixes
  content = fixQuotesAndApostrophes(content);
  content = fixAnyTypes(content);
  
  // Apply file-specific fixes
  const fixes = fileSpecificFixes[filePath];
  if (fixes) {
    if (fixes.unusedImports) {
      content = removeUnusedImports(content, fixes.unusedImports);
      console.log(`   ✓ Removed unused imports: ${fixes.unusedImports.join(', ')}`);
    }
    if (fixes.unusedVars) {
      content = removeUnusedVars(content, fixes.unusedVars);
      console.log(`   ✓ Removed unused variables: ${fixes.unusedVars.join(', ')}`);
    }
  }
  
  // Only write if changes were made
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`   ✅ Fixed successfully`);
  } else {
    console.log(`   ℹ️  No changes needed`);
  }
}

// Fix lib/marketplace.ts - change let to const
function fixMarketplace(): void {
  const filePath = path.join(process.cwd(), 'lib/marketplace.ts');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/let LISTINGS =/g, 'const LISTINGS =');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Fixed lib/marketplace.ts (let → const)');
  }
}

// Fix textarea.tsx empty interface
function fixTextarea(): void {
  const filePath = path.join(process.cwd(), 'components/ui/textarea.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace empty interface with type alias
    content = content.replace(
      /export interface TextareaProps\s+extends\s+React\.TextareaHTMLAttributes<HTMLTextAreaElement>\s*{\s*}/g,
      'export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Fixed components/ui/textarea.tsx (empty interface)');
  }
}

// Main execution
console.log('🚀 Starting ESLint auto-fix...\n');
console.log('='.repeat(50));

filesToFix.forEach(processFile);
fixMarketplace();
fixTextarea();

console.log('\n' + '='.repeat(50));
console.log('\n✨ Auto-fix complete!');
console.log('\n📝 Manual fixes still needed:');
console.log('   1. components/property/Map.tsx - Move hooks before conditional returns');
console.log('   2. useEffect dependencies - Add missing deps or disable with comments');
console.log('   3. tailwind.config.ts - Replace require() with import or add eslint-disable');
console.log('   4. Some complex "any" types may need specific interfaces');
console.log('\n💡 Next steps:');
console.log('   Run: npm run lint');
console.log('   Then: npm run lint -- --fix');
console.log('   This will show remaining issues and auto-fix formatting.');