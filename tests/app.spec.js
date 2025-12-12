const { test, expect } = require('@playwright/test');

test.describe('영양 기록장 기능 및 UI 테스트', () => {

  // 모바일 환경(iPhone SE) 사이즈로 테스트 강제 설정
  test.use({ viewport: { width: 375, height: 667 } });
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:8080');
    page.on('dialog', dialog => dialog.accept());
  });

  // [기존] 기능 테스트
  test('음식 추가 및 리스트 반영 확인', async ({ page }) => {
    await page.fill('#foodName', '테스트햄버거');
    await page.fill('#kcal', '500');
    await page.click('text=기록 저장');
    const foodList = page.locator('#foodList');
    await expect(foodList).toContainText('테스트햄버거');
  });

  // [신규] 레이아웃 깨짐 감지 테스트 (매우 중요!)
  test('모바일 화면에서 입력창이 화면 밖으로 넘치는지 검사', async ({ page }) => {
    
    // 1. 문제가 되었던 날짜 입력창(#entryDate)과 부모 카드(.card)를 찾습니다.
    const input = page.locator('#entryDate');
    const card = page.locator('.card').first();

    // 2. 브라우저에게 "각 요소의 실제 가로 사이즈와 위치"를 물어봅니다.
    const inputBox = await input.boundingBox();
    const cardBox = await card.boundingBox();

    // 3. 검증: 입력창의 오른쪽 끝(x + width)이 카드의 오른쪽 끝보다 안쪽에 있어야 합니다.
    // (약간의 오차 2px 정도는 허용)
    const inputRight = inputBox.x + inputBox.width;
    const cardRight = cardBox.x + cardBox.width;

    console.log(`카드 오른쪽 끝: ${cardRight}, 입력창 오른쪽 끝: ${inputRight}`);

    // 만약 입력창이 카드보다 튀어나갔다면 테스트가 실패합니다.
    expect(inputRight).toBeLessThanOrEqual(cardRight + 2);
  });
});
