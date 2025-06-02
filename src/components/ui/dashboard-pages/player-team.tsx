
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Plus, UserPlus, Mail, Crown, Shield, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const PlayerTeam = () => {
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const myTeams = [
    {
      id: 1,
      name: "Thunder Bolts FC",
      role: "Captain",
      members: 8,
      matches: 12,
      wins: 8,
      created: "2024-01-15"
    },
    {
      id: 2, 
      name: "Lightning Strikers",
      role: "Player",
      members: 11,
      matches: 15,
      wins: 10,
      created: "2024-02-20"
    }
  ];

  const teamMembers = [
    { id: 1, name: "Ahmed Rahman", email: "ahmed@example.com", role: "Captain", position: "Forward" },
    { id: 2, name: "Sakib Hassan", email: "sakib@example.com", role: "Vice Captain", position: "Midfielder" },
    { id: 3, name: "Rafiq Ahmed", email: "rafiq@example.com", role: "Player", position: "Defender" },
    { id: 4, name: "Karim Islam", email: "karim@example.com", role: "Player", position: "Goalkeeper" }
  ];

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a team name",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Team Created!",
      description: `${teamName} has been created successfully`,
    });
    
    setTeamName('');
    setIsCreatingTeam(false);
  };

  const handleInvitePlayer = () => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Error", 
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Invitation Sent!",
      description: `Invitation sent to ${inviteEmail}`,
    });
    
    setInviteEmail('');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Captain': return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'Vice Captain': return <Shield className="w-4 h-4 text-blue-600" />;
      default: return <Star className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Create Team Section */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-50/60 via-white/40 to-purple-50/60 border border-white/30 rounded-3xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center text-xl">
            <Users className="w-6 h-6 mr-3 text-blue-600" />
            Team Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isCreatingTeam ? (
            <Button
              onClick={() => setIsCreatingTeam(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl px-8 py-3 shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Team
            </Button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
                <Input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name..."
                  className="rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleCreateTeam}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl"
                >
                  Create Team
                </Button>
                <Button
                  onClick={() => setIsCreatingTeam(false)}
                  variant="outline"
                  className="rounded-2xl border-gray-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Teams */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center text-xl">
            <Users className="w-6 h-6 mr-3 text-emerald-600" />
            My Teams
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {myTeams.map((team) => (
            <div key={team.id} className="p-6 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-800">{team.name}</h3>
                    <Badge className={`${
                      team.role === 'Captain' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                    } rounded-2xl px-3 py-1`}>
                      {team.role}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600">
                    <span>{team.members} members</span>
                    <span>{team.matches} matches</span>
                    <span>{team.wins} wins</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-2xl border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Team Members & Invite */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Team Members */}
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center text-xl">
              <Users className="w-6 h-6 mr-3 text-emerald-600" />
              Thunder Bolts FC Members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-800">{member.name}</h4>
                      {getRoleIcon(member.role)}
                    </div>
                    <p className="text-sm text-gray-600">{member.position}</p>
                  </div>
                </div>
                <Badge className="bg-gray-100 text-gray-700 rounded-2xl px-3 py-1">
                  {member.role}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Invite Players */}
        <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center text-xl">
              <UserPlus className="w-6 h-6 mr-3 text-blue-600" />
              Invite Players
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Player Email</label>
              <div className="flex space-x-3">
                <Input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="player@example.com"
                  className="flex-1 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
                />
                <Button
                  onClick={handleInvitePlayer}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl px-6"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Invite
                </Button>
              </div>
            </div>
            
            <div className="text-center py-8">
              <UserPlus className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">Build your dream team</p>
              <p className="text-sm text-gray-500">Invite players via email to join your team</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
