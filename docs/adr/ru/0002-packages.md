# Выделение отдельных пакетов

## Статус

*Какой статус, такой как предлагаемый (proposed), принятый (accepted), отклоненный(rejected), устаревший (deprecated), заменен (superseded) и т.д.?*

2023-05-28 предлагаемый
2023-05-29 принятый

## Контекст

*Какая проблема мотивирует это решение или изменение?*

На данный момент основной пакет содержит 1 зависимость (yaml). Хотя основная либа не зависит от этого пакета. Зависит только 1 провайдер. В будущем могут быть добавлены провайдеры для других форматов и количество зависимостей может увеличиться. А следовательно, будут сложнее управлять этими зависимостями.

## Решение

*Какое изменение мы предлагаем и/или делаем?*

### 1 решение - монорепозиторий

Сделать монорепозиторий, где

1. core - основная либа (без зависимостей), которая содержит 2 основных провайдера из коробки (js и json)

2. и есть отдельные провайдеры, которые содержат доп зависимости.

### 2 решение - мультирепозиторий

Можно выделить провайдеры в отдельные репозитории.

### Сравнение и выбор оптимального решения

С одной стороны мультирепо дает лучшую изоляцию и возможность работать отдельными командами
С другой мнорепо позволяет сделать пакеты независимости, но в тоже время облегчает поддержку проекта для одной команды

так как команда - это я один, и являюсь независимым мэйнтейниром проекта. И я не знаю будут ли еще контрибьютеры. Но в тоже время хочется предоставить разработчикам гибкость в использовании либы. То предпочту выбрать смешанный вариант.

Я сделаю монорепу, в которую входит core и официальные packages providers для либы. Но в тоже время любой разработчик может создать:

1. PR нового провайдера, как отдельный пакет (который должен будет удовлетворять правилам)
2. свой репозиторий с провайдером, который может быть публичным/приватным (такой провайдер мб добавлен в итоге как пакет в рамках монорепы)

## Последствия

*Что становится проще или труднее сделать из-за этого изменения?*

1. Система усложняется, но умерено за счет выбора монорепы в качестве основы.
2. Увеличивается гибкость выбора провайдера (от самой либы-монорепы или от сторонних разработчиков)
3. Возможность решение проблем с производительностью провайдера за счет появления альтернатив (в будущем)
4. Выбор провайдера становится сложнее за счет появление (в будущем) альтернатив, и этот выбор перекладывается на разработчика
