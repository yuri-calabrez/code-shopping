<?php

namespace CodeShopping\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use CodeShopping\Models\User;

class PhoneNumberChangeEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $url;
    private $token;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, string $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->url = route('customers.web_phone_number_update', ['token' => $this->token]);
        return $this
            ->subject('Alteração de número de telefone')
            ->markdown('mails.phone_number_change_mail');
    }
}
