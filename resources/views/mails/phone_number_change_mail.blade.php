@component('mail::message')
# Mudança de número de telefone

Uma mudança de número de telefone foi solicitada, clique no link abaixo para valida-la.

@component('mail::button', ['url' => $url])
Validar telefone 
@endcomponent

Obrigado,<br>
{{ config('app.name') }}
@endcomponent
