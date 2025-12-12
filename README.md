# Nutrition Tracker (프로젝트 이름)

## 📖 프로젝트 소개
이 프로젝트는... (간단한 프로젝트 설명, 예: 영양소 섭취를 기록하고 추적하는 웹 애플리케이션입니다.)

## 🛠️ 기술 스택
- HTML, CSS, JavaScript
- (사용하신 다른 기술들...)

## 📝 개발 일지 & 트러블슈팅 (Troubleshooting)

### 1. Chrome 브라우저 날짜 입력폼(Date Input) 레이아웃 이탈 현상
- **문제 상황:** `input[type="date"]` 요소가 부모 컨테이너(배경 레이아웃)의 너비를 초과하여 튀어나가는 UI 깨짐 현상 발생.
- **원인:** Chrome 등 일부 브라우저의 User Agent Stylesheet(기본 스타일)가 날짜 입력 필드에 고정된 너비나 패딩을 강제로 적용하고 있어, 일반적인 CSS 수정만으로는 반영되지 않음.
- **해결:** CSS에서 `!important` 속성을 사용하여 브라우저 기본 스타일을 강제로 덮어씌우고, 너비를 부모 요소에 맞게 조정함.
  ```css
  /* 해결 코드 예시 */
  input[type="date"] {
    width: 100% !important; /* 부모 너비에 맞춤 */
    box-sizing: border-box !important; /* 패딩 포함 너비 계산 */
  }
