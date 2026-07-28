# Workspace Rules & Directives

- **Filter Header Styling**: Keep the outline borders (`border: 1px solid #E2E4E9`) on filter header buttons/chips as requested by the user.
- **No Borders on Badges/Tags**: Do not add visible borders to feature tags, status badges, or counters in card bodies. Use borderless soft background fills (`#F4F5F7`, `#F2F5FA`).
- **Premium Design Standards**: Maintain high-end Apple / Banki.ru modern visual design with smooth typography and micro-interactions.
- **No Browser/Chrome Opening**: Do not use browser subagents or open Chrome to test or inspect pages. Make code changes directly; the user will test manually.
- **Card Details Template (Тарифы)**: When defining or rendering card details ("Подробности по карте" / "Тарифы"), follow this exact standardized structure:
  - **Тип карты**: `• [Mastercard Standard / Visa Virtual / etc.]`
  - **Стоимость выпуска**: `• [Цена ₽]` with nested list starting with em-dashes `—`:
    - `выпуск карты через ...;`
    - `срок действия карты составляет ...;`
    - `минимальный депозит — ...;`
    - `карта поддерживает 3D Secure;`
    - `назначение / для каких сервисов подписок и путешествий;`
    - `комиссия за транзакцию — ...;`
    - `ограничения по переводам;`
    - `запрещенные страны (при наличии).`
  - **Годовое обслуживание**: `• [Цена ₽]` with nested details list (`— ...`)
  - **Снятие наличных в любых банкоматах**: `• не предусмотрено` (or specified condition)
  - **Варианты выпуска**: `• Цифровая` (with tooltip `i` icon)
  - **Привилегии для держателей**: bulleted items (`• ...`):
    - `пополняемый баланс — от X $ до Y $ одним платежом;`
    - `максимальный лимит трат в месяц — Z $`


