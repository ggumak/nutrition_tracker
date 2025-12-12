const { test, expect } = require('@playwright/test');

test.describe('영양 기록장 기능 테스트', () => {
  
  // 모든 테스트 시작 전에 페이지 접속
  test.beforeEach(async ({ page }) => {
    // 로컬 서버의 index.html로 접속
    await page.goto('http://127.0.0.1:8080');
    
    // 알림창(alert, confirm)이 뜨면 무조건 "확인(OK)"을 누르도록 설정
    page.on('dialog', dialog => dialog.accept());
  });

  test('음식 추가 및 리스트 반영 확인', async ({ page }) => {
    // 1. 음식 정보 입력
    await page.fill('#foodName', '테스트햄버거');
    await page.fill('#kcal', '500');
    await page.fill('#protein', '20');

    // 2. '기록 저장' 버튼 클릭 (텍스트로 버튼 찾기)
    await page.click('text=기록 저장');

    // 3. 리스트에 '테스트햄버거'가 나타났는지 검증
    const foodList = page.locator('#foodList');
    await expect(foodList).toContainText('테스트햄버거');
    await expect(foodList).toContainText('500kcal');
  });

  test('분석 탭 그래프 반영 확인', async ({ page }) => {
    // 1. 음식 추가 (500kcal)
    await page.fill('#foodName', '그래프테스트음식');
    await page.fill('#kcal', '500');
    await page.click('text=기록 저장');

    // 2. '분석/목표' 탭으로 이동
    await page.click('text=📊 분석/목표');

    // 3. 목표 칼로리가 기본 2000일 때, 500kcal가 텍스트에 반영되었는지 확인
    // (UI에 "500 / 2000" 같은 텍스트가 있어야 함)
    const kcalText = page.locator('#txt-kcal');
    await expect(kcalText).toContainText('500');
  });

  test('음식 삭제 기능 확인', async ({ page }) => {
    // 1. 음식 추가
    await page.fill('#foodName', '삭제할음식');
    await page.click('text=기록 저장');

    // 2. 삭제 버튼 클릭 (리스트의 첫 번째 삭제 버튼)
    await page.click('.btn-del');

    // 3. 리스트가 비었는지(혹은 해당 텍스트가 사라졌는지) 확인
    const foodList = page.locator('#foodList');
    await expect(foodList).not.toContainText('삭제할음식');
  });
});
